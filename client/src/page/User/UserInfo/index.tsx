import React from 'react';
import InfoHeader from "@/page/User/components/InfoHeader";
import './index.less'
import {Avatar, Upload} from "antd";
import {CameraOutlined} from "@ant-design/icons";
import baseUrl from "@/utils/baseUrl";
import {useStore} from "@/store";


const UserInfo = () => {
  const {userStore} = useStore()
  const {userInfo} = userStore
  return (
    <div className="userInfo">
      <div className="userInfo-header">
        <InfoHeader/>
        <div className="upload-tx">
          <div className="tx">
            <Upload className="showIt">
              <Avatar
                style={{backgroundColor: 'rgba(0,0,0,.5)'}}
                icon={<CameraOutlined/>}
                size={100}></Avatar>
            </Upload>

            <Avatar icon={<CameraOutlined/>} size={100} src={`${baseUrl}${userInfo.tx}`}/>
          </div>
          <div className="userInfo-bottom">
            <div className="left">
              <p className="username">{userInfo.username}
                <span className="level">Lv {userInfo.level}</span>
              </p>
              <p className="introduce">{userInfo.introduce ? userInfo.introduce : '无'}</p>
            </div>
            <div className="right">
              <span className="cancel">个人设置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
