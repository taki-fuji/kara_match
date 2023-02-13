// 検索結果一つひとつのコンポーネントです
import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const Item2 = (props) => {
    const [checked, setChecked] = React.useState(false);

    const handleToggle =  () => {
        // 曲の追加済みと追加前を切り替える関数
      setChecked(!checked);
    };
  return (
        <ListItem
          key={props.key}
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle}
              checked={checked}
            />
          }
          disablePadding
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${props.key + 1}`}
                src={props.item.artworkUrl100.replace('100x100bb.jpg','300x300bb.jpg')}
              />
            </ListItemAvatar>
            <ListItemText primary={props.item.trackCensoredName} />
          </ListItemButton>
        </ListItem>
    
    );
}

export default Item2