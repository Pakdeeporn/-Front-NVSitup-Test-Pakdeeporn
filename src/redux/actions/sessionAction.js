import * as actionTypes from './actionType'

export const login = (user) => (dispatch) => { 
  //สามารถ Call web api ที่ส่วนนี้ได้ 
   // const user = await UserService.login(userName, password);

   //base64
   if (typeof user === 'string')
    dispatch({
      type: actionTypes.SESSION_LOGIN,
      payload : JSON.parse(Buffer.from(user, 'base64'))
    })
  else
    dispatch({
      type: actionTypes.SESSION_LOGIN,
      payload : user
    })

};

export const logout = () => (dispatch) => dispatch({
  type: actionTypes.SESSION_LOGOUT
});
