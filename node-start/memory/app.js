const getData = () => {
  const ref = { a: 1 };
  return ref;
};

main = () => {
  let ref1 = getData();
  let ref2 = { ref1 };

  ref1 = undefined;
  ref2.ref1 = undefined;
};

main();
