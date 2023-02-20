// 検索結果一つひとつのコンポーネントです
import React, {useEffect} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

// contextをインポート
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';
import { PlaylistProvider } from '../../../context/playlist/interface';

type propsType = {
  item: any;
  key: any;
};

const Item2 = (props: propsType) => {
    // playlist contextを持ってくる
    const { playlist, playlistDispatch, showAllCheckedSongs }: PlaylistProvider = React.useContext(PlaylistContext);
    
    const [checked, setChecked] = React.useState(false);

    // 再検索時にチェックボックスの初期化がされないバグをuseEffectで解消
    useEffect(() => {
      //console.log("propsの音楽に変更がありました。 変更後は以下です: ")
      setChecked(false);
     }, [props.item.trackCensoredName]);

    const handleToggle =  () => {
        // 曲の追加済みと追加前を切り替える関数
        // すでに追加されているのなら、actionはremoveSong, まだならaddSongをする
        if (checked === false){// 追加されてない曲の場合
          console.log("曲を追加します。 曲名: " + props.item.trackCensoredName);
          playlistDispatch({
            type: "ADD_SONG",
            payload: {
              userId: props.item.userId,
              name: props.item.trackCensoredName,
              imageSrc: props.item.artWorkUrl100 ,
              collectionId: props.item.collectionId,
              artistName: props.item.artistName,
              artistId: props.item.artistId,
            }
          });
        }else if (checked === true){
          console.log("曲を削除します。 曲名: " + props.item.trackCensoredName);
          playlistDispatch({
            type: "REMOVE_SONG",
            payload: {
              collectionId: props.item.collectionId,
            }
          });
        }else{
          console.log("checkedでもuncheckedでもありません in Item2.tsx");
        }
      setChecked(!checked);
    };

    const handleDisplayCollectionId = () => {
        console.log(props.item.collectionId)
    }
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
          <ListItemButton onClick={handleDisplayCollectionId}>
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