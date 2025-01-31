import jwtDecode from "jwt-decode";

export const validateToken = (token) => {
  const now = Math.round(new Date().getTime() / 1000);
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch {
    return false;
  }

  if (!decodedToken || typeof decodedToken.exp !== "number") {
    return false;
  }

  return now < decodedToken.exp;
};
