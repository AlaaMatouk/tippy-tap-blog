import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { getDocs, query, orderBy } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

export const addPost = async ({ title, content, imageUrl }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const docRef = await addDoc(collection(db, "posts"), {
    title,
    content,
    imageUrl,
    authorId: user.uid,
    authorName: user.displayName || "Anonymous",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getAllPosts = async () => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deletePost = async (postId) => {
  const ref = doc(db, "posts", postId);
  await deleteDoc(ref);
};
