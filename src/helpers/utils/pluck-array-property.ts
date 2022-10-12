function pluckArrayProperty<T, K extends keyof T>(
  arr: T[],
  prop: K,
  condition?: (x: T[K], index?: number) => boolean
): T[K][] {
  const new_arr = arr.flatMap((item: T, index) =>
    condition === undefined || condition(item[prop], index) ? item[prop] : []
  );
  return new_arr;
}

export { pluckArrayProperty };
