import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "./firebaseConfig";

// Toggle favorite (add/remove)
export const toggleFavorite = async (postId, isFav) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const favRef = doc(db, "favorites", user.uid);

  if (isFav) {
    // remove
    await updateDoc(favRef, {
      [postId]: deleteField(),
    });
  } else {
    // add
    await setDoc(
      favRef,
      {
        [postId]: true,
      },
      { merge: true }
    );
  }
};

// Check if post is favorited
export const isPostFavorited = async (postId) => {
  const user = auth.currentUser;
  if (!user) return false;

  const favRef = doc(db, "favorites", user.uid);
  const favSnap = await getDoc(favRef);

  return favSnap.exists() && favSnap.data()[postId];
};

// Get full posts that are favorited
export const getUserFavoritesPosts = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const favRef = doc(db, "favorites", user.uid);
  const favSnap = await getDoc(favRef);

  if (!favSnap.exists()) return [];

  const favData = favSnap.data();
  const favPostIds = Object.keys(favData);

  if (favPostIds.length === 0) return [];

  const postsRef = collection(db, "posts");
  const postsQuery = query(
    postsRef,
    where("__name__", "in", favPostIds.slice(0, 10))
  ); // Max 10 at once
  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
