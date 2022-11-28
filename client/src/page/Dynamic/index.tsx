import React, {useEffect, useState} from 'react';
import CharFrame from "@/page/Dynamic/component/Char-frame";
import type {MenuProps} from 'antd';
import {Avatar, Dropdown, Menu, message, Space} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import './index.less'
import InterNav from "@/page/Dynamic/component/InterNav";
import {$axios, baseUrl, formatTime} from "@/utils";

const onClick: MenuProps['onClick'] = ({key}) => {
  message.info(`Click on item ${key}`).then();
};

const menu = (
  <Menu
    onClick={onClick}
    items={[
      {
        label: '我的好友',
        key: '1',
      },
      {
        label: '其他',
        key: '2',
      },
    ]}
  />
);
const Dynamic: React.FC = () => {
  const [article, setArticle] = useState([])
  //获取文章数据
  const getArticle = async () => {
    let {data, code} = await $axios({
      method: 'get',
      url: '/article/all'
    })
    if (code === 200) {
      console.log(data)
      setArticle(data)
    } else {
      message.error(`Error`)
    }
  }
  //浏览监听
  const viewArticle = async (_id: string) => {
    await $axios({
      method: 'get',
      url: '/article/monitor',
      params: {
        _id
      }
    })
  }
  useEffect(() => {
    getArticle().then()
  }, [])
  return (
    <div id="dynamic">
      {/*输入框*/}
      <CharFrame/>
      {/*筛选*/}
      <div className="select-header">
        <Dropdown overlay={menu}>
        <span onClick={e => e.preventDefault()}>
          <Space>
            全部动态
            <DownOutlined/>
          </Space>
        </span>
        </Dropdown>
      </div>
      <div className="dynamic-content" style={{backgroundColor: 'white'}}>
        <ul>
          {
            article ?
              article.map((item: any) => <li onClick={() => viewArticle(item._id)} key={item._id}>
                <div className="dynamic-header">
                  <div className="left">
                    <Avatar size={48} icon={<UserOutlined/>} src={baseUrl + item.user.tx}/>
                    <div className="userInfo">
                      <p className="username">{item.user.username}</p>
                      <p className="time">{formatTime(item.time)}</p>
                    </div>
                  </div>
                  <div className="right">
                    <DownOutlined style={{paddingTop: '10px', paddingRight: '5px', color: 'rgba(204, 204, 204)'}}/>
                  </div>
                </div>
                <div className="art-content">
                  {item.content}
                </div>
                {/*点赞评论*/}
                <InterNav pageView={item.pageView} artID={item._id} likeList={item.likes}/>
                {/*评论区具体内容*/}
                {/*<Comment commentList={item.msg} artID={item._id}/>*/}
              </li>) : ''
          }
        </ul>
      </div>

    </div>
  );
};

export default Dynamic;
