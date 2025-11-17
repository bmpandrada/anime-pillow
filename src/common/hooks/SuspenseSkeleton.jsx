import { Suspense } from "react";
import SkeletonCard from "../components/Loaders/SkeletonCard";

export const SuspenseSkeleton = ({ children, loading, qty = 3 }) => {
  if (loading) {
    return <SkeletonCard qty={qty} />;
  }

  return <Suspense fallback={<SkeletonCard qty={qty} />}>{children}</Suspense>;
};
