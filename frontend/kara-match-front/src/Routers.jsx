import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Menu from "./components/Menu";
import Home from "./Home";

import MatchSearch from "./components/match_components/match_search";
import MatchWaite from "./components/match_components/match_waite";
import MatchCandidate from "./components/match_components/match_candidate_list";
import MatchComplete from "./components/match_components/match_complite";

import FriendList from "./components/friend_components/friend_list";
import FriendDetail from "./components/friend_components/friend_detail";

import MyPlaylistList from "./components/show_playlist_components/myplaylist_list";
import MyPlayList from "./components/show_playlist_components/my_playlist";
import MusicSearch from "./components/music_search_components/MusicSearch"

import Setting from "./components/setting_components/setting"

import Match from "./components/song_match/Match";
import SongList from "./components/songlist_components/SongList";


// hooks context
import ApiContextProvider from "./context/ApiContext"
import { PlaylistContextProvider } from "./context/playlist/PlaylistContext.tsx";


import MatchContextProvider from "./context/MatchContext"



// cookie管理
import { CookiesProvider } from 'react-cookie'


import React from 'react';//いらないかも
import SongListAndSearch from "./components/SongListAndSearch/SongListAndSearch";

const Routers = () => {
  return (
    <>
    {/* <h1>RoutersPage</h1> */}

    <React.StrictMode>
      <BrowserRouter>
        <CookiesProvider>
        <ApiContextProvider>
        <MatchContextProvider>
        <PlaylistContextProvider>
            {/* <Route path="A" element={<B />} />
            AのURLページでBのコンポーネントを表示している。

            http://localhost:3000 + "A"
            ↑
            3000までのURLがデフォルト
          */}
            {/*
            遷移ボタンはMaterial-UI(Reactのデザインライブラリ)のButtonとLinkを使っている。
            例）下の"ボタン名"というボタンを押すとCのURLページに切り替わる。
            <Button
            component = {Link} to = "C"
            >ボタン名<Button>
          
          {/* <Provider store={store}> */}
            <Routes>
              {/* <Route path="A" element={<B />} />
              AのURLページでBのコンポーネントを表示している。

              http://localhost:3000 + "A"
              ↑
              3000までのURLがデフォルト
            */}

            <Route path="/Home" element={<Home />} />

            <Route path="/" element={<Login />} />
            <Route path="/menu" element={<Menu />} />

            <Route path="/match-search" element={<MatchSearch />} />
            <Route path="/match-waite" element={<MatchWaite />} />
            <Route path="/match-candidate" element={<MatchCandidate />} />
            <Route path="/match-complite" element={<MatchComplete />} />

            <Route path="/friend-list" element={<FriendList />} />
            <Route path="/friend-detail" element={<FriendDetail />} />

            <Route path="/myplaylist" element={<MyPlayList />} />
            <Route path="/myplaylist-list" element={<MyPlaylistList />} />
            <Route path="/music-search" element={<MusicSearch />} />

            <Route path="/setting" element={<Setting />} />

            <Route path="/matting" element={<Match />} />
            <Route path="/song-list" element={<SongList />} />

            <Route path="/songlistandsearch" element={<SongListAndSearch />} />

          </Routes>
          </PlaylistContextProvider>
          </MatchContextProvider>
          </ApiContextProvider>
        </CookiesProvider>
      </BrowserRouter>
      </React.StrictMode>
    </>
  );
};
export default Routers;
