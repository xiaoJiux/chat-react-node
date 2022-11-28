import React, {useEffect, useRef, useState} from 'react';
import './index.less'
import {BranchesOutlined, LikeFilled, MessageFilled} from "@ant-design/icons";
import {$axios} from "@/utils";
import {message} from "antd";
import {useStore} from "@/store";


const InterNav: React.FC<{ pageView: number, artID: string, likeList: Array<string> }> = (props) => {
  let {pageView, artID, likeList} = props
  const [like, setLike] = useState(false)
  const likeRef = useRef(null)
  const {userStore} = useStore()
  const {userInfo} = userStore

  const onLike = async () => {
    if (!like) {
      let {code, msg} = await $axios({
        method: "get",
        url: '/article/like',
        params: {
          _id: artID
        }
      })

      return code !== 200 ? message.error(msg) : setLike(true)
    } else {
      let {code, msg} = await $axios({
        method: "get",
        url: '/article/dislike',
        params: {
          _id: artID
        }
      })

      return code !== 200 ? message.error(msg) : setLike(false)
    }

  }
  useEffect(() => {
    if (likeList.indexOf(userInfo._id) !== -1) {
      setLike(true)
    }
  }, [])

  return (
    <div id="InterNav">
      <div className="sketchInfo">
        <i style={{fontSize: '13px'}}>浏览{pageView}次</i>
        <div className="operate-icon">
          <LikeFilled onClick={() => {
            onLike()
          }} style={{
            color: `${!like ? 'rgba(145,145,145)' : 'rgba(46,138,231)'}`,
            fontSize: '18px'
          }}/>
          <MessageFilled ref={likeRef} style={{
            color: 'rgba(145,145,145)',
            fontSize: '18px'
          }}/>
          <BranchesOutlined style={{color: 'rgba(145,145,145)', fontSize: '18px'}}/>
        </div>
      </div>
      {
        likeList.length > 0 ? <>
          <div className="like-list">
        <span className="like-icon">
          <LikeFilled style={{color: 'rgba(255,255,255)', fontSize: '12px'}}/>
        </span>
            {likeList.map((item: any) => {
              if (item)
                return <a href="#" key={item._id}>{item.username}</a>
            })}
          </div>
        </> : ''
      }

    </div>
  );
};

export default InterNav;
