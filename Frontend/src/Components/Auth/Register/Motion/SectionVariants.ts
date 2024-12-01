const sectionVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.3
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.3
    }
  })
};

export default sectionVariants;
