// 検索結果一つひとつのコンポーネントです
import React, {useEffect} from 'react'

// mui
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import { Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// contextをインポート
import { PlaylistContext } from '../../../context/playlist/PlaylistContext';
import { PlaylistProvider } from '../../../context/playlist/interface';

import { ApiContext } from '../../../context/ApiContext';

import { useRef, EffectCallback, DependencyList } from 'react';

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
    const { createSong, deleteSong, setAddsong, addsong, mysong, setMysong, Dsong, setDsong,UpdateCheck,setUpdateCheck} = React.useContext(ApiContext)
    const [createToggle, setCreateToggle] = React.useState(false);//チェックボックスがチェックされたら変更してuseEffectを起動できるようにする,歌を追加する関数を起動する
    const [deleteToggle, setDeleteToggle] = React.useState(false);//歌を除去する関数を起動する
    const [SongUpdateToggle, setSongUpdateToggle] = React.useState(false);//songステイトを更新するためのstate変数
    const [toggle, setToggle] = React.useState(false);//チェックボックスがチェックされたら変更してuseEffectを起動できるようにする
    
    function useDidUpdateEffect(fn: EffectCallback, deps: DependencyList) {//useEffectを初回起動しないようにするuseEffect
      const didMountRef = useRef(false);
      useEffect(() => {
        if (!didMountRef.current) {
          didMountRef.current = true;
        } else {
          fn();
        }
      }, deps);
    }
    // Avatarをstyledする
    const CustomAvatar = styled(Avatar)({
      "&:hover":{
        backGroundColor: "red",
      }
    });

    //stateが一個遅れるためuseEffectを使うことでワンクッション置くことにした
    useDidUpdateEffect(() => {//初回起動しないuseEffect,上で作った
      createSong();//この関数で歌をデータベースに保存する
      // setKeyToggle(!KeyToggle)
    }, [createToggle]);

    useDidUpdateEffect(() => {
      deleteSong();//この関数で歌をデータベースから除去する
    }, [deleteToggle]);

    useDidUpdateEffect(() => {
      Del();
    },[SongUpdateToggle]);

    function Del(){//歌を除去する関数の下準備
      Object.values(mysong).map((s: any) =>{//Object.values(mysong)とすることでmtsongをobject型からarray型に変更している
        if(props.item.trackId === s.trackId){//チェックを押した歌のcollectionIdと自分の選択した歌のcollectionIdを比較して同じ場合だったら
          setDsong(s.id)//変更する歌のidをDsongに格納する
          console.log(s.song_name + "id :" + s.id)
          setDeleteToggle(!deleteToggle);//歌を除去する関数を起動する
        }
      })
    }

    function SongJudg(){//歌がデータベースにあった時は、チェックボックスにチェックをいれる,
      mysong.map((s: any) =>{//mapを使いデータベースと表示されている歌のリストで同じものを探しチェックする
        if(props.item.trackId === s.trackId){
          // console.log(props.item.trackCensoredName)
          setChecked(true)
        }
      })
    }


    useEffect(() => {SongJudg()},[UpdateCheck])//props.item,,addsong,Dsong


    // 再検索時にチェックボックスの初期化がされないバグをuseEffectで解消
    useEffect(() => {
        console.log("propsの音楽に変更がありました。 変更後は以下です: ")
        setChecked(false);
        SongJudg();//追加することで初期化された後にデータベースの中身をチェックボックスに反映させることができた
    }, [props.item.trackCensoredName]);


    const handleMoveItunesPage = () => {
      window.open(props.item.collectionViewUrl)
    }
    // 曲の追加済みと追加前を切り替える処理
    // すでに追加されているのなら、actionはremoveSong, まだならaddSongをする
    const handleToggle = async () => {
        if (checked === false){// 追加されてない曲の場合
          console.log("曲を追加します。 曲名: " + props.item.trackCensoredName);

          playlistDispatch({
              type: "ADD_SONG",
              payload: {
                userId: props.item.userId, // これはエラー回避のためになんでもない数字を入れているが、将来的にdjango上のユーザーIDを入れたい
                name: props.item.trackCensoredName,
                imageSrc: props.item.artworkUrl100,
                collectionId: props.item.collectionId,
                artistName: props.item.artistName,
                artistId: props.item.artistId,
                trackId: props.item.trackId,
              }
          });
          
          setAddsong({//ここにおくと最初だけbadrequestになるのかな？

            id: "0",
            song_name: props.item.trackCensoredName,
            singer: props.item.artistName,
            artistId: props.item.artistId,
            collectionId: props.item.collectionId,
            trackId: props.item.trackId,
            img_url: props.item.artworkUrl100,
          })
          
          setCreateToggle(!createToggle)//ここでstateを変えてcreateSong()を起動する,そうしないとstateの中身が更新されておらず一個遅れて歌の情報が送信されてしまう


          setChecked(!checked);
          
        }else{
          setChecked(!checked);
          console.log("曲を削除します。 曲名: " + props.item.trackCensoredName);
          playlistDispatch({
            type: "REMOVE_SONG",
            payload: {
              collectionId: props.item.collectionId,
            }
          });

          // console.log(mysong.song_name);
          // console.log(typeof(mysong));
          // Object.values(mysong).map((s: any) =>{
          //   console.log("現在の歌リスト" + s)
          // })

          setSongUpdateToggle(!SongUpdateToggle);//歌を除去する関数をuseEffectで起動する,直接関数を呼び出すとデータがずれる

        setChecked(!checked);
    };
  }

  return (
      <ListItem
        key={props.key}
        secondaryAction={
          <Checkbox
            icon={<PlusIcon/>}
            edge="end"
            onChange={handleToggle}
            checked={checked}
          />
        }
        disablePadding
      >
        <ListItemButton onClick={handleToggle}>
          <ListItemAvatar>
            <Tooltip title={<PlayCircleOutlineIcon/>} arrow={true} enterDelay={50} placement="top-start">
              <CustomAvatar
                onClick={handleMoveItunesPage}
                alt={`Avatar n°${props.key + 1}`}
                src={props.item.artworkUrl100.replace('100x100bb.jpg','300x300bb.jpg')}
              />
            </Tooltip>
          </ListItemAvatar>
          <ListItemText 
            primary={props.item.trackCensoredName}
            secondary={
              <React.Fragment>
                {props.item.artistName}
              </React.Fragment>
            }
           />
        </ListItemButton>
      </ListItem>
    );
}

export default Item2
