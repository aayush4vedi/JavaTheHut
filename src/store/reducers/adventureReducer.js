const initState = {
  // adventures: [
  //   {
  //     id: 1,
  //     title: "Playing piano at my home",
  //     char: "Oswald",
  //     when: "3rd September, 7pm"
  //   },
  //   {
  //     id: 2,
  //     title: "Getting 3 marshmellos with my tea",
  //     char: "Henry",
  //     when: "3rd September, 4pm"
  //   },
  //   {
  //     id: 3,
  //     title: "Riding bicycle",
  //     char: "Daisy",
  //     when: "3rd September, 2am"
  //   }
  // ]
};

const adventureReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ADVENTURE_SUCCESS':
      console.log('create adventure success');
      return state;
    case 'CREATE_ADVENTURE_ERROR':
      console.log('create adventure error');
      return state;
    default:
      return state;
  }
};

export default adventureReducer;
