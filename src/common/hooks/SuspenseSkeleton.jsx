import { Suspense } from "react";
import SkeletonCard from "../components/Loaders/SkeletonCard";

export const SuspenseSkeleton = ({ children }) => (
  <Suspense
    fallback={Array.from({ length: 3 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  >
    {children}
  </Suspense>
);
