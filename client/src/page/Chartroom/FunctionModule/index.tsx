import React, {useState} from 'react';
import './index.less'
import {SmileFilled} from '@ant-design/icons'
import {Button, Input} from 'antd';
import {useParams} from "react-router-dom";
import {useStore} from "@/store";
import {observer} from "mobx-react-lite";
import {ws} from "@/utils";

const {TextArea} = Input;


const FnModule: React.FC = () => {
  const [value, setValue] = useState(String)
  const {userStore} = useStore()
  let params = useParams();
  let id = params.id
  const sendMsg = () => {
    // chartStore.sendMsg(typeof id === "string" ? id : undefined as unknown as string, userStore.userInfo._id, value)
    ws.send(JSON.stringify({
      to: id,
      from: userStore.userInfo._id,
      msg: value
    }))
    setValue('')
    // console.log(chartStore.chartList)
  }


  return (
    <div className="FnModule">
      <div className="chart-user-icon">
        <SmileFilled style={{color: "rgba(135,139,153)", fontSize: '18px'}}/>
      </div>
      <div className="chart-input">
        <TextArea
          bordered={false}
          placeholder=""
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          autoSize={{minRows: 3, maxRows: 4}}
        />
      </div>
      <Button onClick={sendMsg} type="primary" style={{position: 'absolute', right: '10px', bottom: '10px'}}
              size={"small"}>发送</Button>
    </div>
  );
};

export default observer(FnModule);
