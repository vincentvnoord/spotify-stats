import { Variants, motion } from "framer-motion"
import Image from "next/image";

export const SpotifyLink = ({ hovered, width = 30, height = 30 }: { hovered: boolean, width?: number, height?: number }) => {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: "-100%"
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    return (
        <motion.div whileHover={{ scale: 1.1 }} variants={variants} animate={hovered ? "visible" : "hidden"} initial="hidden">
            <div className="h-full flex items-center">
                <Image src="/spotify-icon.svg" alt="spotify" width={width} height={height} />
            </div>
        </motion.div>
    )
}