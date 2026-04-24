"use client"
import React, { useState } from "react" ;
import { useRouter } from "next/navigation";
import "./register.css";

function page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = ()=> {
        if(!email|| !password){
            alert("fill empty fields..")
            return;
            }
    const user ={email,password};
    localStorage.setItem("user",JSON.stringify(user));
    alert("Registation successeful");
    router.push("/auth/login");    
    };
  return (
    <div className="register">
      <h1>Register</h1>
      {/* input */}
      <input
      type="email"
      placeholder = "enter your email"
      value = {email}
      onChange={(e) => setEmail (e.target.value)} />  
      
      <input
      type="password"
      placeholder = "enter your password"
      value = {password}
      onChange={(e) => setPassword (e.target.value)}  />
      {/* button */}
      <button className="register-btn" onClick={handleRegister}>Register </button>
      {/* already have account */}
      <p>
        Already have an account?{""}
        <span onClick={() => router.push("/auth/login")} className="link">
          Login
        </span>
      </p>
    </div>
  )
}

export default page
