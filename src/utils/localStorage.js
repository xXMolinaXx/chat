export const userLoggedKeyName = 'userLogged';

export const setValueLocalStorage = (keyName, value) =>
  localStorage.setItem(keyName, JSON.stringify(value));
export const getValueLocalStorage = (keyName) =>
  JSON.parse(localStorage.getItem(keyName));

