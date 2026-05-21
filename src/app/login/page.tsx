"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import styles from "./Login.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await loginAction(formData);
  }, null);

  return (
    <div className={styles.loginContainer}>
      <div className={`glass-panel ${styles.loginBox}`}>
        <h1 className={styles.title}>Admin Access</h1>
        
        <form action={formAction} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Enter admin password"
            />
          </div>
          
          {state?.error && (
            <p className={styles.error}>{state.error}</p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={isPending}>
            {isPending ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/">← Back to Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
