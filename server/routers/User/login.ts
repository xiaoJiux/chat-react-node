import {userDB} from "../../db/user";
import {IBody, ILogin} from "../../interface/router.user";

const router = require('koa-router')()

router.post("/", async (ctx: {
  [x: string]: any; body: IBody; request: any
}) => {
  let {username, password}: ILogin = ctx.request.body

  try {
    let doc = await userDB.findOne({
      username
    })

    if (doc) {

      if (doc.password === password) {
        let userInfo = {
          username: doc.username,
          _id: doc._id,
          tx: doc.tx,
          regTime: doc.regTime,
          admin: doc.admin,
          bgImg: doc.bgImg,
          sex: doc.sex,
          level: doc.level,
          online: true//登录修改状态为在线
        }
        ctx.session.userInfo = userInfo
        // console.log('登陆成功')
        return ctx.body = {
          code: 200,
          msg: "登陆成功!",
          data: userInfo
        }
      }
      return ctx.body = {
        code: 402,
        msg: '密码错误'
      }
    }
    ctx.body = {
      code: 402,
      msg: '未找到该用户'
    }
  } catch (err) {
    console.error(err)
    ctx.body = {
      code: 404,
      msg: "服务器出错了!"
    }
  }
})


//检测登陆
router.get('/getInfo', async (ctx: {
  [x: string]: any; body: IBody, request: any
}) => {

  if (ctx.session.userInfo) {
    await userDB.updateOne({_id: ctx.session.userInfo._id}, {
      online: true
    }).then(r => {
      if (r.acknowledged) {
        ctx.session.userInfo.online = true
        return ctx.body = {
          code: 200,
          data: ctx.session.userInfo
        }
      }
    })

  } else {
    ctx.body = {
      code: 601,
      msg: '未查询到cookie'
    }
  }

})


//退出
router.get('/layout', async (ctx: { [x: string]: any; body: IBody, request: any, session: any }) => {
  try {
    if (ctx.session.userInfo) {
      await userDB.updateOne({_id: ctx.session.userInfo._id}, {
        online: false
      }).then(r => {
        if (r.modifiedCount === 1) {
          return ctx.session = null
        }
      })
      ctx.body = {
        code: 200,
        msg: '退出成功!'
      }
    }
  } catch (err) {
    console.error(err)
  }
})
router.get('/notOnline', async (ctx: any) => {
  let {_id} = ctx.query
  // console.log(_id);
  await userDB.updateOne(_id, {
    online: false
  })
  ctx.body = {
    code: 200,
    msg: '退出成功!'
  }
})
//离线
router.get('/off-line', async (ctx: any) => {
  let {_id} = ctx.query
  await userDB.updateOne({_id: _id}, {
    online: false
  })
})

module.exports = router.routes()
