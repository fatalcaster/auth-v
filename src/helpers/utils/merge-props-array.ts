function mergePropsArray<T1, K1 extends keyof T1, T2, K2 extends keyof T2>(
  arr1: T1[],
  prop1: K1,
  arr2: T2[],
  prop2: K2
) {
  if (arr1.length !== arr2.length) {
    return [];
  }
  const arr = [];
  for (let i = 0; i < arr1.length; i++) {
    const t = {
      [prop1]: arr1[i][prop1],
      [prop2]: arr2[i][prop2],
    };
    arr.push(t);
  }
  return arr;
}

export { mergePropsArray };
