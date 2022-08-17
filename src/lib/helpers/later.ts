export const later = (delay: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
