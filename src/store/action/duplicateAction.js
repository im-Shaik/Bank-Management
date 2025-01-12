export const duplicateForEmail = (duplicateEmail) => (dispatch) => {
  dispatch({
    type: "DUPLICATE_EMAIL",
    payload: duplicateEmail,
  });
};
export const clearDuplicateForEmail = () => (dispatch) => {
  dispatch({
    type: "DUPLICATE_EMAIL",
    payload: null,
  });
};
