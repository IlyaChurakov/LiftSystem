const createQueue = (foo) => {
    const queue = [];
    let pending = false;
  
    const start = () => {
      if (!pending) pending = true;
      const params = queue.shift();
  
      foo(...params).then(() => {
        pending = false;
        if (queue.length) start();
      });
    };
  
    return (...params) => {
      queue.push(params);
  
      if (!pending) start();
    };
};
  
export default createQueue;


// let x = 20;
// let array = [50, 10, 20, 80, 30];
// let newArr = [...array]
// let closest = newArr.sort( (a, b) => Math.abs(x - a) - Math.abs(x - b) )[0];

// console.log(closest)

// console.log(array.indexOf(closest))

  