import {DoubleRightOutlined} from '@ant-design/icons';
import {Button, Input, Form, message} from 'antd';
import {Link, NavigateFunction} from "react-router-dom";
import React from 'react';
import './index.less'
import {$axios} from "@/utils/http";
import {useNavigate} from "react-router-dom";


const Reg: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const onFinish = async (values: any) => {
    let {code, data, msg} = await $axios({
      url: '/reg',
      method: 'post',
      data: values
    })

    if (code === 200) {
      //跳转到登录
      message.success(msg);
      navigate('/RegLogin', {replace: true})
    } else {
      message.warn(msg)
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="reg">
      <p className="all-title">REGISTER</p>
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
            <Button htmlType="submit">REGISTER <DoubleRightOutlined style={{marginLeft: "24px"}}/></Button>
          </Form.Item>
          <Link to="/RegLogin">go to login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Reg;
