export const verifyLogin = (user, password) => {
  if (user === '24kGoldn' && password === 'mood') {
    return true;
  }
  return false;
}
