"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      alert("Login successful");

      // ✅ VERY IMPORTANT (MAIN FIX)
      localStorage.setItem("isLoggedIn", "true");

      // ✅ store user again (safe)
      localStorage.setItem("user", JSON.stringify(storedUser));


      router.replace("/profile");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Button */}
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      {/* Redirect */}
      <p>
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/auth/register")}
          className="link"
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;