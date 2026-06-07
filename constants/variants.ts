export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

export const leftPanelVariants = {
    hidden: { opacity: 0, x: -40, rotateY: 25, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 8, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

export const rightPanelVariants = {
    hidden: { opacity: 0, x: 40, rotateY: -25, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0, // Set to 0 initially, hand over control to custom spring transforms once loaded
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

export const globalUiVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

export const footerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
  };

export const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };