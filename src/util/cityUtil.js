export function k2eCity(korean) {
  let eng;
  switch (korean) {
    case "베이징":
      eng = "beijing";
      break
    default:
      eng = "default";
      break
  }
  return eng;
}


export default {k2eCity}