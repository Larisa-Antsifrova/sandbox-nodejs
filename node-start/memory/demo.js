let outer = null;

let run = function () {
  let inner = outer;

  let unused = function () {
    if (inner) {
      console.log("Hi inside inner condition!");
    }

    outer = {
      longStr: new Array(100).join("*"),
    };
  };
};

setInterval(run, 1000);
