import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import Friend from "@/page/Layout/Friend";
import './index.less'
import {AppstoreOutlined, HomeFilled} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Col, Menu, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import SetUser from "@/page/Layout/SetUser";
import {useStore} from "@/store";
import {observer} from "mobx-react-lite";


const items: MenuProps['items'] = [
  {
    label: (
      <Link to={"/"}>首页</Link>
    ),
    key: 'home',
    icon: <HomeFilled/>,
  },
  {
    label: (
      <Link to="/dynamic">动态</Link>
    ),
    key: 'dynamic',
    icon: <AppstoreOutlined/>,
  },
  {
    label: (
      <Link to="/123">其他</Link>
    ),
    key: '123',
  },
  {
    label: (
      <Link to="/456">其他</Link>
    ),
    key: '456',
  },
];

const MyLayout: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const location = useLocation().pathname

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };
  const {userStore} = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrent(() => {
      const key = location.split('/')[1]
      return key ? key : 'home'
    })
  }, [])
  useEffect(() => {
    (async function () {
      await userStore.getUserInfo().then((r: boolean) => {
        if (!r) {
          setTimeout(() => {
            navigate('/RegLogin')
          }, 4000)
        }
      })

    })()
  }, []);


  return (
    <div id="myLayout">
      <Row className="header" align="middle">
        <Col span={6} className="app_name">
          OnlyLife
        </Col>
        <Col span={13}>
          <Menu theme={"dark"} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </Col>
        <Col span={5} style={{textAlign: 'right', paddingRight: '75px'}}>
          <SetUser/>
        </Col>
      </Row>
      <div className="body">
        <Friend></Friend>
        <div className="box">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default observer(MyLayout);
