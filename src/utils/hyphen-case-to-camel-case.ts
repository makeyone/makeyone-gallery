export default (keyword: string) => {
  return keyword.toLowerCase().replace(/-[a-z]/g, (str) => str[1].toUpperCase());
};
