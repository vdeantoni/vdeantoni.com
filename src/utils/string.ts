export const plural = (num: number, words: string[]) => {
  num = Math.abs(num);
  num = num > 2 ? 2 : num;
  return words[num];
};
