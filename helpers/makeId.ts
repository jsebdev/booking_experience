const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const numberToLetters = (number: number) => {
  let letters = "";
  while (number > 0) {
    let remainder = number % 26;
    let letter = String.fromCharCode(65 + remainder);
    letters = letter + letters;
    number = Math.floor(number / 26);
  }
  return letters;
};

/**
 * makeId return a unique id from a string
 * @param str - string to hash
 * @returns hashed string
 */
export const makeId = (str: string) =>
  numberToLetters(cyrb53(str) + new Date().getTime());
