export const getCookieByName = (name) => {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(';');
    for (const cookie of cookiesArray) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };