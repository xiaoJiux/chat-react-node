import {makeAutoObservable} from "mobx";

class LoginStore {
  constructor() {
    //响应式
    makeAutoObservable(this)
  }

}

const loginStore = new LoginStore()
export default loginStore
