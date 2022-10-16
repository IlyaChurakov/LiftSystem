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

      console.log(`params: ${params}`)
    };
  
    return (...params) => {
      queue.push(params);
      console.log(`queue: ${queue}`)
      if (!pending) start();
    };
};
  
export default createQueue;
  