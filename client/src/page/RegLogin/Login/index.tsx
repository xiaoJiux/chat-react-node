import {DoubleRightOutlined} from '@ant-design/icons';
import {Button, Input, Form} from 'antd';
import {Link, NavigateFunction} from "react-router-dom";
import React from 'react';
import './index.less'
import {$axios} from '@/utils/http';
import {useNavigate} from "react-router-dom";
import {useStore} from "@/store";

const Login = () => {
  const navigate: NavigateFunction = useNavigate()
  const {userStore} = useStore()

  const onFinish = async (values: any) => {

    let {code, msg, data} = await $axios({
      url: '/login',
      method: 'post',
      data: values
    })
    if (code === 200) {
      await userStore.getUserInfo()
      navigate('/', {replace: false})
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login">
      <p className="all-title">LOGIN</p>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="username item">
          <p className="title">USER NAME</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }]}
          >
            <Input size="large" placeholder="YOUR USER NAME"/>
          </Form.Item>
        </div>
        <div className="password item">
          <p className="title">PASSWORD</p>
          <Form.Item
            name="password"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input size="large" placeholder="YOUR PASSWORD"/>
          </Form.Item>
        </div>
        <div className="bottom">
          <Form.Item>
            <Button htmlType="submit">LOGIN <DoubleRightOutlined style={{marginLeft: "24px"}}/></Button>
          </Form.Item>
          <Link to="/RegLogin/register">go to Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
