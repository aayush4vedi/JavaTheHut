export const createAdventure = (adventure) => {
    return (dispatch, getState,{getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('adventures').add({
        ...adventure,
        char: 'Oswald',
        authorId: 12345,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_ADVENTURE_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_ADVENTURE_ERROR' }, err);
      });
    }
  };