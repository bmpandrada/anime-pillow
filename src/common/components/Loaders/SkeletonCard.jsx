import React from "react";
export default function SkeletonCard({ qty = 1 }) {
  return (
    <>
      {Array.from({ length: qty }).map((_, i) => (
        <div key={i} className='flex w-full flex-col space-x-5 space-y-5 mt-2'>
          <div className='skeleton h-50 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      ))}
    </>
  );
}
``;
