import React from "react";
import ContinueReadingBtn from "./ContinueReadingBtn";
import FavBtn from "./FavBtn";

export default function PostCard({
  title,
  id,
  content,
  imageUrl,
  authorName,
  inFavoritesPage,
  actions,
  onUnfavorite,
}) {
  console.log("imageUrl:", imageUrl);

  return (
    <div className="max-h-[600px] flex justify-center mt-10 px-4">
      <div className="card bg-base-100 w-full max-w-[700px] shadow-md p-4 sm:p-6">
        <figure className="rounded-lg overflow-hidden">
          <FavBtn
            postId={id}
            inFavoritesPage={inFavoritesPage}
            onUnfavorite={onUnfavorite}
          />

          <img
            className="max-h-[350px] w-full object-cover"
            src={imageUrl}
            alt="Post"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg sm:text-2xl">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-4">{content}</p>
          <div className="card-actions mt-4 flex justify-between items-center pb-0">
            <ContinueReadingBtn postId={id} />
            <div className="flex items-center gap-2">
              {actions ? (
                actions
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-md text-gray-500">{authorName}</span>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
