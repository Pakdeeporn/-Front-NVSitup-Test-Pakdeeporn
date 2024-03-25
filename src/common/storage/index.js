import * as storageTypes from "./storageTypes";

let Storage = {};

Storage.clear = () => localStorage.clear();

////////////////////// Get //////////////////////
Storage.getUser = () => {  
  let result = null;
  if(localStorage.getItem(storageTypes.USER) !== null)
    result = JSON.parse(Buffer.from(localStorage.getItem(storageTypes.USER), 'base64'));

  return result;
};

////////////////////// Set //////////////////////
Storage.setUser = value => {
  localStorage.setItem(storageTypes.USER, value);
};

export default Storage;