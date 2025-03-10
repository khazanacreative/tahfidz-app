
export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier easing
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }
});

export const scaleIn = (delay: number = 0) => ({
  initial: { opacity: 0, scale: 0.97 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }
});

export const slideInRight = (delay: number = 0) => ({
  initial: { x: 20, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  },
  exit: { 
    x: -20, 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }
});

export const staggerChildren = (staggerTime: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerTime
    }
  }
});
