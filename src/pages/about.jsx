// src/pages/About.jsx
import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className='min-h-screen  p-5'>
      <div className='max-w-lg m-auto'>
        <h1 className='font-bold text-amber-500 text-2xl text-center'>
          About Top Anime Pillow
        </h1>

        <p className='mt-5 text-center'>
          This project is an Anime Browser App built with React and TailwindCSS,
          powered by the Jikan API
        </p>
      </div>
    </div>
  );
}
