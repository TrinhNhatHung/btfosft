import React, { useState } from 'react';

const Counter = () => {
  console.log('Counter re-render');

  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
};

export default Counter;
