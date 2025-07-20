import React, { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import PostCard from "../components/PostCard";
import PostActions from "../components/PostActions";
import Loading from "../components/Loadingskeleton";
import AddPostBtn from "../components/AddPostBtn";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "posts"),
          where("authorId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        const userPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(userPosts);
      } catch (err) {
        console.error("Error loading My Posts:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <AddPostBtn />
      <h1 className="text-2xl font-bold text-center mb-6">My Posts</h1>

      {loading ? (
        <div className="min-h-screen flex justify-center align-top">
          <Loading />
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            actions={
              <PostActions
                postId={post.id}
                onDelete={() => {
                  setPosts((prev) => prev.filter((p) => p.id !== post.id));
                }}
              />
            }
            inMyPosts={true}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          You haven’t posted anything yet.
        </p>
      )}
    </div>
  );
}
