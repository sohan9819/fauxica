export const staggerContainer = () => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
});

export const filterContainer = (filterActive: boolean) => ({
  hidden: {
    opacity: filterActive ? 0 : 1,
    scaleY: filterActive ? 0 : 1,
    height: filterActive ? 0 : 'max-content',
  },
  show: {
    opacity: filterActive ? 1 : 0,
    scaleY: filterActive ? 1 : 0,
    height: filterActive ? 'max-content' : '0rem',
    transformOrigin: 'top center',
    transition: {
      type: 'ease',
      duration: 0.2,
    },
  },
});
