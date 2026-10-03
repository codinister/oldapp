const rerender = (fn, num) => {
  const rend = localStorage.getItem('rend');

  if (rend == num) {
    fn();
    localStorage.setItem('rend', 0);
  }

  setTimeout(() => {
    rerender(fn, num);
  }, 1000);
};

export default rerender;
