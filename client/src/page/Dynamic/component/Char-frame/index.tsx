import React, {useState} from 'react';
import {Button, Input} from "antd";
import {PictureOutlined, SmileFilled} from "@ant-design/icons"
import './index.less'
import {$axios} from "@/utils";
import {useStore} from "@/store";


const {TextArea} = Input;
const CharFrame: React.FC = () => {
  const [value, setValue] = useState('');
  const {userStore: {userInfo}} = useStore()
  const emoji = ['😀', '😄', '😅', '🤣', '😇', '🥰', '😚', '🤪', '😶‍', '🥵', '🤢', '🧐', '😱', '👿', '🤡', '💩', '🙈', '🤬', '✊🏼', '👀', '🐸', '🐔']

  const writeArt = async (): Promise<void> => {

    let {code} = await $axios({
      url: '/article/write',
      method: 'post',
      data: {
        content: value,
        user: userInfo._id
      }
    })

    if (code === 200) {
      setValue('')
    }
  }

  return (
    <div id='charFrame'>
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="快说点什么吧~"
        autoSize={{minRows: 4, maxRows: 6}}
      />
      <div className="publish-art-box">
        <div className="use-icon">
          <div className="emoji">
            <div className="box">
              {emoji.map((item: string, index: number) => <span key={'emoji' + index} onClick={() => {
                setValue(value + emoji[index])
              }}>
                {item}
              </span>)}
            </div>
            <SmileFilled style={{color: "rgba(135,139,153)", fontSize: '18px'}}/>
          </div>
          <div className="pic">
            <PictureOutlined style={{color: "rgba(135,139,153)", fontSize: '18px'}}/>
          </div>
        </div>
        <Button onClick={() => {
          writeArt()
        }} size={"small"} className="publish-art" type="primary">发表</Button>
      </div>
    </div>
  );
};

export default CharFrame;
