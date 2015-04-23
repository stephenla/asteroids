function run() {
  console.log('this runs');
  return;
  a.forEach(function(el) {
    if (el === 2) {return;}
    console.log("first " + el);
    a.forEach(function (el2) {
      if (el2 === 2) {return;}
      console.log("second " + el2);
    });
  });
  console.log('this still runs');
}
