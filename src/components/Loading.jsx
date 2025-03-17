import React from "react";
import {motion } from 'framer-motion'
export default function Loading() {
  return (
    <motion.div
  initial={{ opacity: 1 }}
  animate={{ opacity: 0 }}
  transition={{ duration: Infinity, ease: "easeOut" }}
  className="absolute inset-[100px] bg-transperent flex items-center justify-center z-50"
>
  <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
</motion.div>
  );
}
