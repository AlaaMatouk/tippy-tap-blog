import React, { useEffect, useState } from "react";
import { toggleFavorite, isPostFavorited } from "../firebase/favorites";

export default function FavBtn({ postId, inFavoritesPage, onUnfavorite }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await isPostFavorited(postId);
      setIsFav(result);
    };
    check();
  }, [postId]);

  const handleClick = async () => {
    if (inFavoritesPage && isFav) {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this from your favorites?"
      );
      if (!confirmRemove) return;
    }

    await toggleFavorite(postId, isFav);
    setIsFav(!isFav);

    if (inFavoritesPage && isFav && onUnfavorite) {
      onUnfavorite(postId);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "var(--gray)",
        color: "var(--primary)",
        borderColor: "var(--gray)",
      }}
      className="btn btn-circle absolute top-4 right-4 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFav ? "var(--primary)" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-[1.2em]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
