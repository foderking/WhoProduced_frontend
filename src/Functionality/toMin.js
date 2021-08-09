
export function toMin(seconds) {
  const min = parseInt(seconds / 60);
  const sec = parseInt(seconds % 60);

  return `${min}: ${sec}`;
}
