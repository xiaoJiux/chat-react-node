import {makeAutoObservable, runInAction} from "mobx";
import {$axios} from "@/utils/http";
import {message} from "antd";

class UserStore {
  userInfo = {}

  constructor() {
    makeAutoObservable(this);
  }

  //获取用户信息
  getUserInfo = async () => {
    let {code, data} = await $axios({
      method: 'get',
      url: '/login/getInfo'
    })


    if (code === 200) {
      runInAction(() => {
        this.userInfo = data
      })
      return true;
    } else {
      message.warn('请重新登陆')
      return false;
    }
  }
}

const userStore = new UserStore()
export default userStore
