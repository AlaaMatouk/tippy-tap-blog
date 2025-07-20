import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import FavBtn from "../components/FavBtn";
import PostActions from "../components/PostActions";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        } else {
          console.error("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const isOwner = user && user.uid === post?.authorId;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      alert("Post deleted");
      navigate("/my-posts");
    } catch (err) {
      console.error("Error deleting post:", err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post)
    return <p className="text-center mt-10 text-red-500">Post not found</p>;

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-3xl p-6">
        <div className="relative rounded-lg overflow-hidden mb-4">
          <FavBtn postId={post.id} />
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full  object-cover rounded-lg"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.content}</p>

        <div className="flex justify-end">
          {isOwner ? (
            <PostActions postId={post.id} />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{post.authorName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
