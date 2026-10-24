export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

export function isValidPhone(phone) {
  const re = /^[\d\s+\-()]{7,20}$/;
  return re.test(String(phone).trim());
}
