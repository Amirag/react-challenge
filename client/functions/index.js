export function order(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

export function removeElementById(array, id) {
  array.forEach((element, i) => {
    if (element.id === id) {
      return array.splice(i, 1).slice();
    }
  });
  return array.slice();
}
