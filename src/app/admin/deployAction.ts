"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import JSZip from "jszip";
import { Octokit } from "@octokit/rest";

const githubUsername = "NirMAN-15";

export async function deployProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("projectZip") as File;
  const coverImageFile = formData.get("coverImage") as File | null;
  const tags = formData.get("tags") as string;

  if (!title || !description || !file) {
    return { error: "Missing required fields" };
  }

  if (file.name && !file.name.endsWith(".zip")) {
    return { error: "File must be a .zip archive" };
  }

  let base64Image = null;
  if (coverImageFile && coverImageFile.size > 0) {
    const buffer = Buffer.from(await coverImageFile.arrayBuffer());
    base64Image = `data:${coverImageFile.type};base64,${buffer.toString("base64")}`;
  }

  const githubToken = process.env.GITHUB_PAT;
  if (!githubToken || githubToken === "your_github_personal_access_token_here") {
    return { error: "GITHUB_PAT is not configured correctly in .env" };
  }

  const repoName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  try {
    const octokit = new Octokit({ auth: githubToken });
    
    // 1. Create Repository
    let repoUrl = "";
    try {
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: description,
        private: false,
        auto_init: true, // Creates initial commit
      });
      repoUrl = repo.html_url;
    } catch (repoError: any) {
      if (repoError.status === 422) {
        return { error: `Repository ${repoName} already exists on GitHub.` };
      }
      throw repoError;
    }

    // 2. Extract ZIP
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    
    // 3. Prepare Git Tree
    const { data: ref } = await octokit.git.getRef({
      owner: githubUsername,
      repo: repoName,
      ref: "heads/main",
    });

    const commitSha = ref.object.sha;
    
    const { data: commit } = await octokit.git.getCommit({
      owner: githubUsername,
      repo: repoName,
      commit_sha: commitSha,
    });
    const baseTreeSha = commit.tree.sha;

    const treeData: any[] = [];

    // Parse files
    const filePromises: Promise<any>[] = [];
    zip.forEach((relativePath, zipEntry) => {
      if (!zipEntry.dir) {
        // Skip hidden/system files (e.g. .DS_Store, __MACOSX)
        if (relativePath.includes(".DS_Store") || relativePath.includes("__MACOSX")) return;

        filePromises.push(
          zipEntry.async("string").then((content) => {
            return {
              path: relativePath,
              mode: "100644",
              type: "blob",
              content: content, // This might fail for binary files like images if treated as string
            };
          })
        );
      }
    });

    const files = await Promise.all(filePromises);
    treeData.push(...files);

    // 4. Inject CI/CD Workflow
    treeData.push({
      path: ".github/workflows/ci.yml",
      mode: "100644",
      type: "blob",
      content: `name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test --if-present
`,
    });

    // 5. Create Tree
    const { data: newTree } = await octokit.git.createTree({
      owner: githubUsername,
      repo: repoName,
      base_tree: baseTreeSha,
      tree: treeData,
    });

    // 6. Create Commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner: githubUsername,
      repo: repoName,
      message: "Initial deployment from Portfolio Admin",
      tree: newTree.sha,
      parents: [commitSha],
    });

    // 7. Update Ref
    await octokit.git.updateRef({
      owner: githubUsername,
      repo: repoName,
      ref: "heads/main",
      sha: newCommit.sha,
    });

    // 8. Save to DB
    await prisma.project.create({
      data: {
        title,
        description,
        repoUrl,
        image: base64Image,
        tags: tags || "Automated",
      }
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Deploy error:", error);
    return { error: error.message || "Failed to deploy project to GitHub" };
  }
}
