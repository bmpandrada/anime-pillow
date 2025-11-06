// src/components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className='flex w-full flex-col space-x-5 space-y-5'>
      <div className='skeleton h-50 w-full'></div>
      <div className='skeleton h-4 w-full'></div>
      <div className='skeleton h-4 w-full'></div>
      <div className='skeleton h-4 w-full'></div>
    </div>
  );
}
``;
