import { easeOut, useInView } from "framer-motion";
import { useRef } from "react";
import {motion} from 'framer-motion'

export default function AnimatedSection({children}){
const ref=useRef(null)
const isinview=useInView(ref,{once:true})

return (
    <motion.div
    initial={{opacity:0,y:50}}
    animate={{opacity:1,y:0}}
    transition={{ease:easeOut,duration:5}}

    >
        {children}
    </motion.div>
)
}