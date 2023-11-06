// this function only exists for the 'removeLocaleFromUrl' function to work properly since
// it's values are throwing an error if empty so it always returns a slash for safety

export default function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}
