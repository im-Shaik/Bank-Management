const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
