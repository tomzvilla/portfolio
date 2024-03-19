import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
};

const TypingText = () => {

    // words state
    const words = ['Software Engineer', 'FullStack Developer', 'Web Developer'];
    const wordsIndex = useMotionValue(0);
    const baseWord = useTransform(wordsIndex, (latest) => words[latest] || "");
    const countWord = useMotionValue(0);
    const roundedWord = useTransform(countWord, (latest) => Math.round(latest));
    const displayWord = useTransform(roundedWord, (latest) =>
        baseWord.get().slice(0, latest)
    );
    const updatedThisRound = useMotionValue(true);


    useEffect(() => {
        animate(countWord, 60, {
            type: "tween",
            duration: 1.5,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
            onUpdate(latest) {
              if (updatedThisRound.get() === true && latest > 0) {
                updatedThisRound.set(false);
              } else if (updatedThisRound.get() === false && latest === 0) {
                if (wordsIndex.get() === words.length - 1) {
                  wordsIndex.set(0);
                } else {
                  wordsIndex.set(wordsIndex.get() + 1);
                }
                updatedThisRound.set(true);
              }
            }
          });
    }, []);

    return (
        <div>
            <span className="inline text-primary text-3xl md:text-5xl h-[55px] mr-5">
                A
            </span >
            <motion.span className="inline text-primary text-3xl md:text-5xl h-[55px]">
                {displayWord }
            </motion.span>
            <motion.div
                id="cursor"
                variants={cursorVariants}
                animate="blinking"
                className="inline-block h-12 w-[2px] translate-y-1 bg-primary"
            />
        </div>
    )
}

export default TypingText