// 把所有模块做统一处理
// 导出一个统一方法 useStore
import React from 'react'
import userStore from "@/store/user.Store";
import loginStore from "@/store/login.Store";
import friendStore from "@/store/friend.Store";


// configure({
//   enforceActions: "never",
// })
class RootStore {
  [x: string]: any;

  constructor() {
    this.loginStore = loginStore
    this.userStore = userStore
    this.friendStore = friendStore
    // ...
  }
}

// 实例化根
// 导出useStore context
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
