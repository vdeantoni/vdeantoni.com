export const plural = (num, words) => {
  num = Math.abs(num);
  num = num > 2 ? 2 : num;
  return words[num];
};
