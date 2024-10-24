import React from 'react'

import MusicSearch from './MusicSearch'

import NewMenuber from '../../component_parts/NewMenuber'

import { Box } from "@mui/material";

const Shwo_MusicSearch = () => {
  return (
    <div>
      <NewMenuber/>
      <Box
        sx={{
          bgcolor: '#e3f2fd', // 青系の背景色
          color: '#0d47a1',   // テキストカラーを濃い青
          padding: 1,         // 全体のパディング
          borderRadius: 3,    // ボックスに丸みを追加
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 軽い影を追加
        }}
      >
        <MusicSearch/>
      </Box>
    </div>
  )
}

export default Shwo_MusicSearch
