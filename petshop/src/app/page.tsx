"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import handleErrorRequest from "@/util/handleErrorRequest";

import { amantic_sc } from "./fonts";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setErrorMessage("");
      event.preventDefault();
      const response: { data: { token: string; expiresIn: number } } =
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL_USER}/user/signin`,
          {
            email,
            password,
          }
        );
      Cookies.set("token", response.data.token, {
        expires: response.data.expiresIn,
      });
      router.push("/home");
    } catch (error) {
      const formatError = handleErrorRequest(error);
      setErrorMessage(formatError.error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={`${styles.brand} ${amantic_sc.className}`}>
          <h1>Welcome to Petshop</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            E-mail:
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <div className={styles.errorMessage}>{errorMessage}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
