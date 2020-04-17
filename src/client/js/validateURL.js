export const validateURL = url => {
  if (!url) {
    return "Please type URL";
  }

  const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  if (!url.match(urlRegex)) {
    return "Please type a valid URL";
  }

  return null;
};
