export const debounce = (func: Function, delay: number = 1000) => {
  let timer: any;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
