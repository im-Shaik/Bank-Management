const initialData = {
  duplicateEmail: null,
};

export const duplicate = (state = initialData, action) => {
  switch (action.type) {
    case "DUPLICATE_EMAIL":
      return {
        ...state,
        duplicateEmail: action.payload,
      };
    case "CLEAR_DUPLICATE_EMAIL":
      return {
        ...state,
        duplicateEmail: null,
      };

    default:
      return state;
  }
};
