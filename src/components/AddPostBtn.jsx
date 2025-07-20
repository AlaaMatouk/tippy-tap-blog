import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function AddPostBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You need to log in to create a post!");
      navigate("/login");
    } else {
      navigate("/add-post");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: "var(--gray)", color: "var(--primary)" }}
      className="btn fixed bottom-4 right-4 z-50 shadow-lg rounded-full"
    >
      + Add Post
    </button>
  );
}
