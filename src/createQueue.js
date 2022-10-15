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
  