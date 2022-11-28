import React from 'react';
import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Divider, message, Popover} from 'antd';
import {useStore} from "@/store";
import baseUrl from '@/utils/baseUrl';
import {observer} from 'mobx-react-lite';
import './index.less'
import {NavigateFunction, useNavigate} from "react-router-dom";
import {$axios} from '@/utils';


const SetUser: React.FC = () => {
  const {userStore} = useStore()
  const {userInfo} = userStore
  const navigate: NavigateFunction = useNavigate()//解构路由

  //退出
  let layout = async () => {
    let {code, msg} = await $axios({
      url: '/login/layout',
      method: 'get'
    })
    if (code === 200) {
      message.success(msg)
      navigate('/RegLogin')
    }
  }


  const content = (
    <div className="pop-up">
      <div onClick={() => {
        navigate('/userInfo')
      }} className="user item" style={{display: "flex", alignItems: 'center'}}>
        <Avatar src={`${baseUrl}${userInfo.tx}`} icon={<UserOutlined/>}/>
        <span style={{paddingLeft: '20px'}}>{userInfo.username}</span>
      </div>
      <Divider></Divider>
      <div className="item" onClick={() => {
        navigate('/setInfo')
      }}>
        <SettingOutlined/>
        <span style={{paddingLeft: '15px'}}>个人设置</span>
      </div>
      <Divider></Divider>
      <div className="item" onClick={() => {

      }}>
        <SettingOutlined/>
        <span style={{paddingLeft: '15px'}}>消息中心</span>
      </div>
      <Divider></Divider>
      <div className="item" onClick={layout}>
        <LogoutOutlined/>
        <span style={{paddingLeft: '15px'}}>退出登录</span>
      </div>
      <Divider></Divider>
    </div>
  );

  return (
    <div className="setUser">
      <Popover
        placement="bottom" content={content} trigger="hover"
      >
        <Avatar src={`${baseUrl}${userInfo.tx}`} icon={<UserOutlined/>}/>
        <span style={{fontSize: '16px', marginLeft: '20px'}}>{userInfo.username}</span>
      </Popover>
    </div>
  );
};

export default observer(SetUser);
