export function getCookie(name: string): string | null {
  const cookieName = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie;
  let value: string | null = null;

  const startIndex = cookie.indexOf(cookieName);
  if (startIndex > -1) {
    let endIndex = cookie.indexOf(';', startIndex);
    if (endIndex == -1) {
      endIndex = cookie.length;
    }
    value = decodeURIComponent(
      cookie.substring(startIndex + cookieName.length, endIndex)
    );
  }
  return value;
}

export function setCookie(name: string, value: string, expireDate: Date | undefined = undefined) {
  let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  let expires: Date
  if (!(expireDate instanceof Date)) {
    expires = new Date(Date.now() + 399 * 86400000)
  } else {
    expires = expireDate
  }
  cookieText += `; expires=${expires.toUTCString()}`;

  document.cookie = cookieText;
}

export function removeCookie(name: string) {
  setCookie(name, '', new Date(0));
}