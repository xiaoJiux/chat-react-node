//发送请求格式
interface IBody {
  code: number,
  msg?: string,
  data?: object | null
}
//登录
interface ILogin {
  username:string,
  password:string
}

export {
  IBody,ILogin
}
