const hideOnClickOutside = (event, ref, callback) => {
  // check if the click target is outside of the div
  if (ref.current && !ref.current.contains(event.target)) {
  //  if(callback) {
  //   callback();
  //  }
  console.log('A')
  }
};

export {
  hideOnClickOutside
} 