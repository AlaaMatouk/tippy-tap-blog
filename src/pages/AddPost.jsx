import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { addPost } from "../firebase/post";

export default function AddPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=4eb6f653c9bc29e6c040b91d7c8efa27",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.display_url;
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (isEdit) {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setForm(snap.data());
          setPreview(snap.data().imageUrl); 
        }
      }
    };
    fetchPost();
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = form.imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadToImgBB(imageFile);
      }

      if (isEdit) {
        const ref = doc(db, "posts", id);
        await updateDoc(ref, {
          title: form.title,
          content: form.content,
          imageUrl: finalImageUrl,
        });
        alert("Post updated successfully!");
      } else {
        const postId = await addPost({
          title: form.title,
          content: form.content,
          imageUrl: finalImageUrl,
        });
        console.log("✅ Post added:", postId);
      }

      setForm({ title: "", content: "", imageUrl: "" });
      setImageFile(null);
      setPreview(null);
      navigate("/my-posts");
    } catch (err) {
      console.error("❌ Error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl shadow-lg bg-white p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-center font-bold text-2xl text-gray-800">
            {isEdit ? "Edit Post" : "Add Post"}
          </h1>

          {/* Title */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post title"
              className="input input-bordered w-full"
              required
            />
          </fieldset>

          {/* Description */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write something..."
              className="textarea textarea-bordered w-full h-24"
              required
            ></textarea>
          </fieldset>

          {/* File Upload */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Upload Image</legend>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="file-input file-input-bordered w-full"
              required={!isEdit} 
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-[250px] object-cover rounded-lg shadow"
                />
              </div>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={uploading}
            className="btn w-full rounded-full"
            style={{ background: "var(--primary)", color: "var(--gray)" }}
          >
            {uploading ? "Uploading..." : isEdit ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
