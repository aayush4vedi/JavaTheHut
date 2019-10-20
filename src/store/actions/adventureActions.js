export const createAdventure = (project) => {
    return (dispatch, getState) => {
      // make async call to database
      dispatch({ type: 'CREATE_PROJECT', project });
    }
  };