import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContinueReadingBtn({ postId }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(`/post/${postId}`)}
        style={{ background: "var(--primary)", color: "var(--gray)" }}
        className="btn btn-wide rounded-full "
      >
        Continue Reading
      </button>
    </div>
  );
}

// shadow-[0_3px_0_rgba(0,0,0,0.75)] hover:shadow-[0_0_0_rgba(0,0,0,0.75)] transition-all duration-150
