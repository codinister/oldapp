const ascendingSort = (arr) => {
  return arr.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  });
};

const descendingSort = (arr) => {
  return arr.sort((a, b) => {
    if (a < b) return 1;
    if (b < a) return -1;
    return 0;
  });
};

export { ascendingSort, descendingSort };
