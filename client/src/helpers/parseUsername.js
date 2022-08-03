export const parseUsername = (url = "") => {
  let output = url;
  let matches;

  // Parse username
  matches = url && url.match(/(?:https?:\/\/)?(?:www.)?(?:twitter|medium|facebook|vimeo|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im);

  // Set output
  output = matches.length ? matches[1] : output;

  return output;
}