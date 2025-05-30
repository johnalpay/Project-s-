export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem("authUser");
  }
  return false;
}

export function loginUser(username) {
  localStorage.setItem("authUser", username);
}

export function logoutUser() {
  localStorage.removeItem("authUser");
}
