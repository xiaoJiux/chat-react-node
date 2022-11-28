const Koa = require('koa')
import * as path from "path";

const {historyApiFallback} = require('koa2-connect-history-api-fallback')
const koaStatic = require('koa-static')//静态资源处理
const koaBody = require('koa-body')//处理post请求
// const cors = require("koa2-cors")//跨域
const cors = require('@koa/cors')

const session = require('koa-session')
const MongoStore = require('koa-session-mongo2')
const socket = require('./routers/Chat/chart.other')


const app = new Koa()
// 处理post
app.use(koaBody({}))
require('./mongoose')

let server = app.listen(3000, async () => {
  console.log('服务启动：http://127.0.0.1:3000')
})
socket(server)


app
  // koa2-connect-history-api-fallback中间件一定要放在静态资源服务中间件前面加载
  // .use(historyApiFallback({
  //   index: '/index.html'
  // }))
  .use(koaStatic(
    // 设置静态资源存放的目录
    path.join(__dirname, './public')
  ))


//跨域，测试使用
app.use(cors({
  origin: 'http://localhost:8088',    // 前端地址
  credentials: true
}))

//session中间件
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost:27017',//地址
    db: 'MyProject',//库名字
    collection: 'sessions',
    // 这里设置的是数据库session定期清除的时间，与cookie的过期时间应保持一致，cookie由浏览器负责定时清除，需要注意的是索引一旦建立修改的时候需要删除旧的索引。此处的时间是秒为单位，cookie的maxAge是毫秒为单位
    maxAge: 60 * 60 * 24 * 7 //10s过期
  }),
  signed: false,
  maxAge: 24 * 60 * 60 * 1000 * 7,
  rolling: true
}, app))


// 加载路由中间件
const routes = require('./routers/index')
// 统一接口返回格式
// app.use(reponseBody())

app
  .use(routes.routes())
  .use(routes.allowedMethods())

