console.log("js connected");


// function greetUser(callback) {
//   console.log("Preparing to greet...");
//   const result = callback();       // ✅ get the return value
//   console.log("Callback result:", result);  // Output: Callback result: 4
// }

// greetUser(() => {
//   return 2 + 2;
// });


// hof 

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

//

function greet(name) {
  return `Hello ${name}`
}


function processUser(name, callback) {
  return callback(name)
}

console.log(processUser("B Alam", (name) => {
  return `hello ${name}`
}));

//  Callback with parameters

console.log(processUser("B Alam", (name) => `Hi ${name}, welcome!`));

function processUserSingle(callback) {
  return callback()
}

processUserSingle(() => greet("B alam single"))
processUserSingle(() => {
  console.log("b alam single callback");
  
})


//  Takes and returns a function

function compose(fn1, fn2) {
  return function (value) {
    return fn2(fn1(value))
  }
}


const add2 = x => x + 2;
const squre = x => x * x;

const addThenSquare = compose(add2, squre)
console.log(addThenSquare(3));


// 


function customReduce(callback, initialValue) {
  return function (array) {
    let accumulator;
    let startIndex;

    // If initialValue is provided
    if (initialValue !== undefined) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      // If no initialValue, use first element as accumulator
      if (array.length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      accumulator = array[0];
      startIndex = 1;
    }

    let index = startIndex;
    for (const item of array.slice(startIndex)) {
      accumulator = callback(accumulator, item, index, array);
      index++;
    }

    return accumulator;
  };
}
