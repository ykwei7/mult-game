const LOWER_MULT_DIV_BOUND = 0;
const UPPER_MULT_DIV_BOUND = 12;
const LOWER_ADD_SUB_BOUND = 0;
const UPPER_ADD_SUB_BOUND = 100;

export const operatorMapping = {
  0: "x",
  1: "+",
  2: "÷",
  3: "-",
};

export const modesMapping = {
  0: "Multiplication (x)",
  1: "Addition (+)",
  2: "Division (÷)",
  3: "Substraction (-)",
  4: "Mania (+, -, x, ÷)",
};

export const getPairs = (gameMode) => {
  switch (gameMode) {
    case 0:
      return getMultPairs(LOWER_MULT_DIV_BOUND, UPPER_MULT_DIV_BOUND);
    case 1:
      return getAddPairs(LOWER_ADD_SUB_BOUND, UPPER_ADD_SUB_BOUND);
    case 2:
      return getDivPairs(LOWER_MULT_DIV_BOUND, UPPER_MULT_DIV_BOUND);
    case 3:
      return getSubtPairs(LOWER_ADD_SUB_BOUND, UPPER_ADD_SUB_BOUND);
    case 4:
      const multPairs = getMultPairs(
        LOWER_MULT_DIV_BOUND,
        UPPER_MULT_DIV_BOUND
      );
      const addPairs = getAddPairs(LOWER_ADD_SUB_BOUND, UPPER_ADD_SUB_BOUND);
      const divPairs = getDivPairs(LOWER_MULT_DIV_BOUND, UPPER_MULT_DIV_BOUND);
      const subtPairs = getSubtPairs(LOWER_ADD_SUB_BOUND, UPPER_ADD_SUB_BOUND);
      return [...multPairs, ...addPairs, ...divPairs, ...subtPairs];
    default:
      return getMultPairs(LOWER_MULT_DIV_BOUND, UPPER_MULT_DIV_BOUND);
  }
};

export const getMultPairs = (LOWER_BOUND, UPPER_BOUND) => {
  let pairs = [];
  for (let i = LOWER_BOUND; i <= UPPER_BOUND; i++) {
    for (let j = LOWER_BOUND; j <= UPPER_BOUND; j++) {
      pairs.push([i, j, i * j, "x"]);
    }
  }
  return pairs;
};

export const getAddPairs = (LOWER_BOUND, UPPER_BOUND) => {
  let pairs = [];
  for (let i = LOWER_BOUND; i <= UPPER_BOUND; i++) {
    for (let j = LOWER_BOUND; j <= UPPER_BOUND; j++) {
      pairs.push([i, j, i + j, "+"]);
    }
  }
  return pairs;
};

export const getSubtPairs = (LOWER_BOUND, UPPER_BOUND) => {
  let pairs = [];
  for (let i = LOWER_BOUND; i <= UPPER_BOUND; i++) {
    for (let j = LOWER_BOUND; j <= UPPER_BOUND; j++) {
      pairs.push([i, j, i - j, "-"]);
    }
  }
  return pairs;
};

export const getDivPairs = (LOWER_BOUND, UPPER_BOUND) => {
  let pairs = [];
  for (let i = LOWER_BOUND; i <= UPPER_BOUND; i++) {
    for (let j = LOWER_BOUND; j <= UPPER_BOUND; j++) {
      pairs.push([i * j, i, j, "÷"]);
    }
  }
  return pairs;
};
