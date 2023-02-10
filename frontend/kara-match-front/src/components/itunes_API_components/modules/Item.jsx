// 検索結果を表示するためのコンポーネントです

import React from 'react'

const Item = (props) => {
  return (
    <li>
        <a href="{props.item.trackViewUrl}">
            <div className="img">
                <img src={props.item.artworkUrl100.replace('100x100bb.jpg','300x300bb.jpg')} alt="artwork" />
            </div>
            <p>{props.item.trackCensoredName}</p>
        </a>
    </li>
  )
}

export default Item