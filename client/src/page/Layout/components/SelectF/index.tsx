import {Avatar} from 'antd';
import React from 'react';
import './index.less'
import {observer} from "mobx-react-lite";
import {useStore} from "@/store";
import baseUrl from "@/utils/baseUrl";
import {useNavigate} from "react-router-dom";

const SelectF = () => {
  const {friendStore} = useStore()
  const {friendList} = friendStore
  const navigate = useNavigate()


  return (
    <div className="selectF">
      <p className="title-name">我的好友</p>
      <ul>
        {
          friendList.map((item: any) => (
            <li key={item._id} onClick={() => {
              navigate(`/chart/${item._id}`)
            }}>
              <Avatar size={38} src={`${baseUrl}${item.tx}`}/>
              <div className="name-state">
                <span className="name">{item.username}</span>
                <span className="state"
                      style={item.online ? {color: ' #3de481'} : {color: 'red'}}>{item.online ? '在线' : '离线'}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default observer(SelectF);
