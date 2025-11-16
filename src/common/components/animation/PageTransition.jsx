import { AnimatePresence, motion } from "motion/react";
import { Suspense } from "react";
import { useLocation } from "react-router";
import SpinnerLoading from "../loaderComponents/SpinnerLoading";

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0,
      ease: "easeIn",
    },
  },
};

const AnimatePage = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='sync'>
      <Suspense key={location.key} fallback={<SpinnerLoading />}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial='initial'
          animate='in'
          exit='out'
        >
          {children}
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatePage;
