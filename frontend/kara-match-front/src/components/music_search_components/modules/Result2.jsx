// 検索結果一つひとつのコンポーネントです
import React from 'react'
import Item2 from './Item2';
import { Drawer, List } from '@mui/material';

const Result2 = (props) => {

  return (
    <List dense sx={{ width: '100%',heigth: '100%', bgcolor: 'background.paper' }}>
        {props.items.map((item,index)=>(
            <Item2 item={item} key={index} />
        ))}
    </List>
);
}

export default Result2