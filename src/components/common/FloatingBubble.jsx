import { motion } from 'motion/react';
export const FloatingBubble = ({
  descripttion,
  floatingStyles,
  setFloatingRef,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: '-50%', scale: 0, y: -10 },
        visible: { opacity: 1, x: '-50%', scale: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        visualDuration: 0.3,
      }}
      className="absolute left-1/2 top-full border-b-[1.5rem] border-l-[1rem] border-r-[1rem] border-b-primary-base border-l-transparent border-r-transparent"
    >
      {/* 본문 부분 */}
      <div
        ref={setFloatingRef}
        style={{ ...floatingStyles }}
        className="absolute w-[80vw] max-w-[350px] break-normal rounded-[.625rem] bg-primary-base p-4 text-base text-white"
      >
        {descripttion}
      </div>
    </motion.div>
  );
};
