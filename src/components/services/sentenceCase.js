export default function sentenceCase(str) {
  return str.replace(/ ([A-Z])/g, (match, letter) => {
    return ' ' + letter.toLowerCase();
  });
}