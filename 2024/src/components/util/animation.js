export const fadeInAnimation = (delay = 0.3, duration = 0.7) => {
  return {
    initial: {
      opacity: 0,
      y: 25,
    },
    show: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * delay, duration: duration },
    }),
  };
};

export const opacityAnimation = (duration = 0.5) => {
  return {
    initial: {
      opacity: 0,
      visibility: "hidden",
    },
    show: {
      opacity: 1,
      visibility: "visible",
      transition: { duration: duration },
    },
  };
};
