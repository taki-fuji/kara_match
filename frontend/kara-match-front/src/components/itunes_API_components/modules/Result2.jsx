// 検索結果一つひとつのコンポーネントです
import React from 'react'
import List from '@mui/material/List';
import Item2 from './Item2';

const Result2 = (props) => {

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.items.map((item,index)=>(
            <Item2 item={item} key={index} />
        ))}
    </List>
);
}

export default Result2