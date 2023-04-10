

export function checkEmail (email: string): boolean {
  return /^[a-z0-9_-]{2,50}@[a-z0-9_-]{1,50}\.[a-z0-9_-]{1,50}$/.test(email);
}

export function checkPassword (password: string): boolean {
  return /^[a-zA-Z0-9_-]{8,50}$/.test(password);
}