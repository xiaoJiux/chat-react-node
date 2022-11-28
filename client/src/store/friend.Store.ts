import {makeAutoObservable, runInAction} from "mobx";
import {$axios} from "@/utils";

class FriendStore {
  friendList: [] = []

  // friendInfo: {} = {}

  constructor() {
    //响应式
    makeAutoObservable(this)
  }

  //获取全部好友信息
  async getFriend() {
    let {data, code, msg} = await $axios({
      method: 'get',
      url: '/friend'
    })

    if (code === 200) {
      runInAction(() => {
        this.friendList = data
        // console.log(this.friendList)
      })
    }
  }

  //搜索单个好友信息
  async getFriendInfo(_id: string) {
    if (_id) {
      let {data, code} = await $axios({
        url: '/friend/findOne',
        method: 'get',
        params: {
          _id
        }
      })
      if (code === 200) {
        return data
      }
    }
  }
}

const friendStore = new FriendStore()
export default friendStore
