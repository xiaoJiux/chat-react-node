import React from 'react';
import {Avatar, Image} from 'antd';
import type {UploadProps} from 'antd';
import {message, Upload} from 'antd';
import {PictureOutlined, UserOutlined} from '@ant-design/icons'
import './index.less'
import baseUrl from "@/utils/baseUrl"
import {useStore} from "@/store";
import {observer} from "mobx-react-lite";
import userStore from "@/store/user.Store";

const props: UploadProps = {
  name: 'bgImg',
  action: 'http://localhost:3000/uploader/bgImg',
  maxCount: 1,
  showUploadList: false,
  method: 'post',
  withCredentials: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      let {response} = info.file
      let {code, msg} = response
      if (code === 200) {
        message.success(msg)
        userStore.getUserInfo()
      }

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }


};

const InfoHeader: React.FC = () => {
  const {userStore} = useStore()
  const {userInfo} = userStore

  return (
    <div className="infoHeader">
      <Image
        height={210}
        src={`${baseUrl}${userInfo.bgImg}`}
        preview={false}
      />
      <Upload {...props}>
        <div className="changeBtn">
          <PictureOutlined style={{color: "rgb(213,213,213)", marginRight: "4px"}}></PictureOutlined>
          更换背景
        </div>
      </Upload>


    </div>
  );
};

export default observer(InfoHeader);
