import { easeOut, useInView } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedSection({ children }) {
  const ref = useRef(null);

  // Trigger the animation when the section is in view
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{
        ease: easeOut,
        duration: 0.8, // Reduced to make the animation quicker for smoother transitions
      }}
      style={{ willChange: "opacity, transform" }} // Performance optimization for animation
    >
      {children}
    </motion.div>
  );
}
