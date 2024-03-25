import * as actionTypes from '../actions/actionType';

const initialState = {
  loggedIn: false,
  user: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState,
        loggedIn:true,
        user : action.payload
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...initialState,
        loggedIn:false
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
