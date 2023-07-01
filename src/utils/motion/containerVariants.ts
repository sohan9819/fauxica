export const staggerContainer = () => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
});
