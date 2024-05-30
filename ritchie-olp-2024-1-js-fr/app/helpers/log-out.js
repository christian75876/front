import { navigateTo } from "../Router";

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  navigateTo('/login');
}