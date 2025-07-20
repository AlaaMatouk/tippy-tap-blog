import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginAndRegister() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(100deg, var(--primary), white)",
      }}
      className="flex items-center justify-center h-screen"
    >
      <div className="relative w-[90%] h-[70%] overflow-hidden bg-white rounded-3xl shadow-lg flex">
        <div
          style={{ backgroundColor: "var(--primary)", color: "var(--gray)" }}
          className={`absolute z-10 top-0 h-full w-1/2 flex flex-col justify-center items-center p-10 transition-all duration-700 ${
            isRegister ? "translate-x-full" : ""
          }`}
        >
          <h1
            style={{ color: "var(--gray)" }}
            className="text-3xl font-bold mb-2"
          >
            {isRegister ? "Welcome!" : "Welcome Back! "}
          </h1>
          <p className="mb-4 text-center text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            style={{ color: "var(--gray)", backgroundColor: "white" }}
            className="btn  btn-wide rounded-full"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>

        <div className="flex w-full h-full">
          <div className="w-1/2 h-full flex items-center justify-center">
            {isRegister && <Register onSwitch={() => setIsRegister(false)} />}
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            {!isRegister && <Login onSwitch={() => setIsRegister(true)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
