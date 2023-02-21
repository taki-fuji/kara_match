// 検索結果一つひとつのコンポーネントです
import React, {useEffect} from 'react'

// mui
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

// import { withCookies } from 'react-cookie';
// import { useCookies } from "react-cookie";

// Dialog(モーダルみたいなもの)をmuiで作るため
import PlaylistSelectDialog from './playlistSelectDialog';

// contextをインポート
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';
import { PlaylistProvider } from '../../../context/playlist/interface';

import { ApiContext } from '../../../context/ApiContext';

// tsは受け取るpropsの値を宣言する
type propsType = {
  item: any;
  key: any;
};



const Item2 = (props: propsType) => {
    // playlist contextを持ってくる
    const { playlist, playlistDispatch, playlist_list, targetPlaylistName }: PlaylistProvider = React.useContext(PlaylistContext);
    // checkboxがcheckされるかを管理
    const [checked, setChecked] = React.useState(false);
    // playlistSelectDialogが表示されるかどうかを管理
    const [playlistSelectDialogIsOpen, setPlaylistSelectDialogIsOpen] = React.useState(false);
    const [selectedPlaylistName, setSelectedPlaylistName] = React.useState('');

    const { createSong, deleteSong, setAddsong, addsong, mysong} = React.useContext(ApiContext)
    
    const handleClickOpen = () => {
      setPlaylistSelectDialogIsOpen(true);
    }

    const handleClose = (value: string) => {
      setPlaylistSelectDialogIsOpen(false);
      setSelectedPlaylistName(value);
    }

    // useEffect(() => {SongJudg()})

    // const SongJudg = () => {
    //   mysong.map((s: any) =>{
    //     if(props.item.collectionId === s.collectionId){
    //       setChecked(true)
    //     }
    //   })
    // }


    // 再検索時にチェックボックスの初期化がされないバグをuseEffectで解消
    useEffect(() => {
       //console.log("propsの音楽に変更がありました。 変更後は以下です: ")
       setChecked(false);
      }, [props.item.trackCensoredName]);

    const handleToggle = async () => {
        // 曲の追加済みと追加前を切り替える関数
        // すでに追加されているのなら、actionはremoveSong, まだならaddSongをする
        if (checked === false){// 追加されてない曲の場合
          console.log("曲を追加します。 曲名: " + props.item.trackCensoredName);

          //ここでプレイリストリストdialogを出現させて、どのプレイリストに追加するかを尋ねる
          setPlaylistSelectDialogIsOpen(true);
          // ユーザーがdialogを閉じるまで結果をまつ
          
          console.log(selectedPlaylistName + "に追加します。");

          playlistDispatch({
            type: "ADD_SONG",
            payload: {
              userId: props.item.userId, // これはエラー回避のためになんでもない数字を入れているが、将来的にdjango上のユーザーIDを入れたい
              playlistName: selectedPlaylistName, //追加先のプレイリスト名で、playlistContextで管理する
              name: props.item.trackCensoredName,
              imageSrc: props.item.artWorkUrl100 ,
              collectionId: props.item.collectionId,
              artistName: props.item.artistName,
              artistId: props.item.artistId,
            }
          });
          setAddsong({//ここにおくと最初だけbadrequestになるのかな？
            id: "0",
            song_name: props.item.trackCensoredName,
            singer: props.item.artistName,
            artistId: props.item.artistId,
            collectionId: props.item.collectionId,
            trackId: "0",
            img_url: "0",
            // props.item.artWorkUrl100,
          })
          createSong()//Songを追加する
        }else if (checked === true){
          console.log("曲を削除します。 曲名: " + props.item.trackCensoredName);
          playlistDispatch({
            type: "REMOVE_SONG",
            payload: {
              collectionId: props.item.collectionId,
            }
          });
          deleteSong();
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
        <PlaylistSelectDialog
        selectedValue={selectedPlaylistName}
        open={playlistSelectDialogIsOpen}
        onClose={handleClose}
      />
      </ListItem>
    );
}

export default Item2