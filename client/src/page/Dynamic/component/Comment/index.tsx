import {Avatar} from 'antd';
import React from 'react';
import './index.less'
import {UserOutlined} from '@ant-design/icons';


const Comment: React.FC<{ commentList: {}, artID: string }> = (props) => {
  let {commentList, artID} = props


  return (
    <div id="comment">
      {/*评论展示*/}
      <ul>
        <li>
          <div className="user-tx">
            <Avatar size={42} icon={<UserOutlined/>}></Avatar>
          </div>
          <div className="right-box">
            <div className="userSay">
              <p className="top-say">
                <a href="#">张三</a>：
                ~你干嘛~哎呦~你
              </p>
              <p className="time">
                10月18日 19:00
              </p>
            </div>
          </div>
        </li>
      </ul>
      {/*输出框*/}

    </div>
  );
};

export default Comment;
