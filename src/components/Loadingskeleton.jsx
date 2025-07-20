import React from "react";

export default function Loading() {
  return (
    <div className="flex w-52 flex-col gap-4 justify-center align-middle ">
      <div
        style={{ backgroundColor: "#91b9c2" }}
        className="skeleton  h-32 w-full"
      ></div>
      <div
        style={{ backgroundColor: "#91b9c2" }}
        className="skeleton h-4 w-28"
      ></div>
      <div
        style={{ backgroundColor: "#91b9c2" }}
        className="skeleton h-4 w-full"
      ></div>
      <div
        style={{ backgroundColor: "#91b9c2" }}
        className="skeleton  h-4 w-full"
      ></div>
    </div>
  );
}
