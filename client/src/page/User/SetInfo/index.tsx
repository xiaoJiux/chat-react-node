import React from 'react';
import './index.less'
import {Avatar, Button, Form, Input, message, Radio, Upload, UploadProps} from 'antd';
import InfoHeader from "@/page/User/components/InfoHeader";
import {useStore} from "@/store";
import {$axios} from "@/utils";
import {CameraOutlined} from "@ant-design/icons";
import baseUrl from "@/utils/baseUrl";
import userStore from "@/store/user.Store";
import {observer} from "mobx-react-lite";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const props: UploadProps = {
  name: 'tx',
  action: 'http://localhost:3000/uploader/tx',
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

const SetInfo = () => {
  const {userStore} = useStore()
  const {userInfo} = userStore
  const onFinish = async (values: any) => {
    let {code, msg} = await $axios({
      method: 'post',
      url: 'setInfo',
      data: values
    })
    if (code === 200) {
      await userStore.getUserInfo()
      message.success(msg)
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="setInfo">
      <div className="setInfo-header">
        <InfoHeader/>
        <div className="upload-tx">
          <div className="tx">
            <Upload className="showIt"  {...props}>
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
              <span className="cancel">取消</span>
              <span className="hold">保存</span>
            </div>
          </div>
        </div>
      </div>
      <div className="setUserInfo">
        <Form  {...layout} name="nest-messages"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
        >
          <Form.Item initialValue={`${userInfo.username ? userInfo.username : ''}`} name={['username']} label="昵称"
                     rules={[{required: true,}]}>
            <Input/>

          </Form.Item>
          <Form.Item name={['email']} label="Email" rules={[{type: 'email'}]}>
            <Input defaultValue={`${userInfo.email ? userInfo.email : ''}`}/>
          </Form.Item>
          <Form.Item name={['sex']} label="性别">
            <Radio.Group defaultValue={`${userInfo.sex === '男' ? '男' : '女'}`}>
              <Radio value="男"> 男 </Radio>
              <Radio value="女"> 女 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={['introduce']} label="个人介绍">
            <Input.TextArea defaultValue={`${userInfo.introduce ? userInfo.introduce : ''}`}
                            placeholder={'还没有留下什么介绍哦~'}/>
          </Form.Item>
          <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(SetInfo);
