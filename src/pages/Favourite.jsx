import React, { useEffect, useState } from "react";
import { getUserFavoritesPosts } from "../firebase/favorites";
import PostCard from "../components/PostCard";
import Loading from "../components/Loadingskeleton";

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favPosts = await getUserFavoritesPosts();
        setFavorites(favPosts);
      } catch (err) {
        console.error("Error loading favorites:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);
  const handleUnfavorite = (postId) => {
    setFavorites((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Favorites</h1>

      {loading ? (
        <div className="min-h-screen flex justify-center align-top">
          <Loading />
        </div>
      ) : favorites.length > 0 ? (
        favorites.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            authorName={post.authorName}
            inFavoritesPage={true}
            onUnfavorite={handleUnfavorite}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">You have no favorite posts.</p>
      )}
    </div>
  );
}
