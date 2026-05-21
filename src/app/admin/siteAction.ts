"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addDeployedSite(formData: FormData) {
  const title = formData.get("site_title") as string;
  const url = formData.get("site_url") as string;
  const description = formData.get("site_description") as string;
  const techStack = formData.get("site_techStack") as string;
  const thumbnailFile = formData.get("site_thumbnail") as File | null;

  if (!title || !url || !description) {
    return { error: "Title, URL, and Description are required." };
  }

  let base64Thumbnail: string | null = null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    base64Thumbnail = `data:${thumbnailFile.type};base64,${buffer.toString("base64")}`;
  }

  try {
    await prisma.deployedSite.create({
      data: {
        title,
        url,
        description,
        techStack: techStack || "Other",
        thumbnail: base64Thumbnail,
      },
    });

    revalidatePath("/sites");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to save deployed site to database." };
  }
}
