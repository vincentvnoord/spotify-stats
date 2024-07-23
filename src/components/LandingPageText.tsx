"use client";

import { motion } from "framer-motion";

const LandingPageText = () => {
    const variants = {
        below: {
            opacity: 0,
            y: "100%"
        },
        show: {
            opacity: 1,
            y: 0
        },
        above: {
            opacity: 0,
            y: "-100%"
        }
    }

    return (
        <div className="text-5xl text-center font-extrabold flex gap-2">
            <h1 className="">Find your top</h1>
            <motion.div>
                <h1>tracks</h1>
            </motion.div>
        </div>
    )
}

export default LandingPageText;