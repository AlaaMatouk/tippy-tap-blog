# 📝 Tippy Tap

**Tippy Tap** is a modern blogging platform built with React, Firebase, and Tailwind CSS.  
Users can sign up, create posts, favorite other posts, and manage their own — all through a clean, responsive UI.

🚀 **Live Demo:** [https://tippy-tap.vercel.app](https://tippy-tap.vercel.app)

---

## 🔥 Features

- 🔐 Firebase Authentication (Email & Google Login)
- 📝 Add / Edit / Delete blog posts
- ❤️ Favorite posts (with instant UI updates)
- 👥 "My Posts" page to manage your own content
- 🖼️ Image upload via [ImgBB](https://imgbb.com)
- 📱 Fully responsive layout (Mobile & Desktop)
- ⚙️ Firestore Security Rules enabled

---

## 🛠️ Stack

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vercel Hosting](https://vercel.com/)

---

## 📂 Folder Structure (Highlights)

```bash
src/
│
├── components/        # Reusable UI (Navbar, Buttons, PostCard, etc.)
├── pages/             # Main views (Home, MyPosts, Favorites, etc.)
├── firebase/          # Firebase auth & Firestore functions
├── App.jsx            # Route definitions
└── main.jsx           # Vite entry point
