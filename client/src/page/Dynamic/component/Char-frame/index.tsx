import React, {useRef, useState} from 'react';
import {Button, Input} from "antd";
import {PictureOutlined, SmileFilled} from "@ant-design/icons"
import './index.less'
import {$axios} from "@/utils";
import {useStore} from "@/store";


const {TextArea} = Input;
const CharFrame: React.FC = () => {
  const [value, setValue] = useState('');
  const {userStore: {userInfo}} = useStore()
  const emoji = ['π', 'π', 'π', 'π€£', 'π', 'π₯°', 'π', 'π€ͺ', 'πΆβ', 'π₯΅', 'π€’', 'π§', 'π±', 'πΏ', 'π€‘', 'π©', 'π', 'π€¬', 'βπΌ', 'π', 'πΈ', 'π']
  const boxRef: any = useRef(null)
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
  const showEmoji = () => {
    if (boxRef.current) {
      boxRef.current.style.display === 'flex' ?
        boxRef.current.style.display = 'none' :
        boxRef.current.style.display = 'flex';
    }
  }


  return (
    <div id='charFrame'>
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="εΏ«θ―΄ηΉδ»δΉε§~"
        autoSize={{minRows: 4, maxRows: 6}}
      />
      <div className="publish-art-box">
        <div className="use-icon">
          <div className="emoji" onClick={() => {
            showEmoji()
          }}>
            <div className="box" ref={boxRef}>
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
        }} size={"small"} className="publish-art" type="primary">εθ‘¨</Button>
      </div>
    </div>
  );
};

export default CharFrame;
