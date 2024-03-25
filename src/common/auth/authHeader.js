import  Storage  from '../storage';

export default function authHeader() {
  let user = Storage.getUser();

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}


