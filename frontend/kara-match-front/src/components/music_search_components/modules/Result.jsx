import React from 'react';
import Item from "./Item";

const Result = (props) => {
  return (
    <ul>
        {props.items.map((item,index)=>(
            <Item item={item} key={index} />
        ))}
    </ul>
  );
}

export default Result