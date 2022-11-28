import './App.css'
import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@/page/RegLogin/Login";
import UserInfo from "@/page/User/UserInfo";
import MyLayout from './page/Layout';
import Home from './page/Home';
import Dynamic from './page/Dynamic';
import NotFound from "@/page/404/404";
import SetInfo from "@/page/User/SetInfo";
import RegLogin from "@/page/RegLogin";
import Reg from "@/page/RegLogin/Reg";
import {observer} from "mobx-react-lite";
import ChartPage from "@/page/Chartroom";
import {useStore} from "@/store";
import {$axios, ws} from "@/utils";


function App() {
  const {chartStore, userStore} = useStore()

  function beforeunload(e: any) {
    let confirmationMessage = '你确定离开此页面吗?';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }


  useEffect(() => {
    if (userStore.userInfo._id) {
      $axios({
        url: 'login/off-line',
        method: 'get',
        params: {
          _id: userStore.userInfo._id
        }
      })
      ws.onopen
    }
  }, [])

  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", beforeunload)
      // 这里写离开页面的后续操作
      // 项目中这个页面使用了websocket。所以在页面离开的时候，需要将websocket关闭掉
      // 关闭websocket
      chartStore.closeWS()
    }
  }, [])
  useEffect(() => {
    // 拦截判断是否离开当前页面
    window.addEventListener('beforeunload', beforeunload);
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/*主页面*/}
          <Route path="/" element={
            <MyLayout/>
          }>
            <Route index element={<Home/>}></Route>
            <Route path="dynamic" element={<Dynamic/>}></Route>
            <Route path="userInfo" element={<UserInfo/>}></Route>
            <Route path="setInfo" element={<SetInfo/>}></Route>
            <Route path="chart/:id" element={<ChartPage/>}></Route>
          </Route>
          {/*登录注册*/}
          <Route path="/RegLogin" element={<RegLogin/>}>
            <Route index element={<Login/>}></Route>
            <Route path="register" element={<Reg/>}></Route>
          </Route>

          <Route path={"*"} element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default observer(App)
