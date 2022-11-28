import React, {RefObject, useEffect, useRef, useState} from 'react';
import './index.less'
import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import {useStore} from '@/store';
import {observer} from "mobx-react-lite";
import baseUrl from "@/utils/baseUrl";
import FnModule from "@/page/Chartroom/FunctionModule";
import {useParams} from "react-router-dom";
import {$axios, ws} from "@/utils";

const ChartPage: React.FC = () => {
  const rollRef: RefObject<any> = useRef(null)
  const [chartList, setChartList] = useState([])
  const {userStore, friendStore} = useStore()
  const [friendName, setFriendName] = useState(String)
  const {userInfo} = userStore
  let params = useParams();
  let id = params.id
  let from = userInfo._id
  //设置好友名字
  useEffect(() => {
    friendStore.getFriendInfo(typeof id === "string" ? id : "").then((r: any) => {
      setFriendName(r.username)
    })
  }, [id])
  //打开页面搜索聊天记录
  useEffect(() => {
    let searchChart = async () => {
      let {data, code} = await $axios({
        method: 'post',
        url: '/chart/findChart',
        data: {
          to: id,
          from: from
        }
      })
      if (code === 200) {
        setChartList(data)
      } else {
        setChartList([])
      }
    }
    searchChart().then()
  }, [id])
  //滚动到最后一行
  useEffect(() => {
    if (rollRef && rollRef.current) {
      rollRef.current.scrollTop = rollRef.current.scrollHeight - rollRef.current.clientHeight
    }
  }, [rollRef, id, chartList])

  useEffect(() => {
    ws.onmessage = (res: any) => {
      const charts = JSON.parse(res.data);
      if (charts.from === id || charts.to === from || charts.from === from || charts.to === id) {
        setChartList(charts.chartList)
      }
    }
  }, [id])


  return (
    <div className="chat">
      <header className='chatName'>{friendName}</header>
      <div style={{height: '10px'}}></div>
      <div className="chart-content">
        <ul ref={rollRef}>
          {
            chartList.map((item: any) => (
              // <li key={item.id}>{item.name}</li>
              <li className={item.user._id === userInfo._id ? 'chart-user-item' : 'chart-other-item'} key={item._id}>
                <Avatar src={`${baseUrl}${item.user.tx}`} size="large" icon={<UserOutlined/>}/>
                <p className="user-msg">{item.msg}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <FnModule></FnModule>
    </div>
  );
};

export default observer(ChartPage);
