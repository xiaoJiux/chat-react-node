import {IBody, ILogin} from "../../interface/router.user";
import {userDB} from "../../db/user";
import {friendDB} from "../../db/friend";

const router = require('koa-router')()

router.post("/", async (ctx: { body: IBody; request: any }) => {
  let {username, password}: ILogin = ctx.request.body
  console.log(ctx.request.body);
  if (!username)
    return ctx.body = {
      code: 202,
      data: {
        msg: '请输入用户名!'
      }
    }
  if (!password)
    return ctx.body = {
      code: 203,
      data: {
        msg: '请输入密码!'
      }
    }

  try {
    //查询是否已经存在用户
    let doc = await userDB.findOne({username})
    if (doc) {
      return ctx.body = {
        code: 201,
        msg: '对不起,用户名已被注册!!',
      }
    }

    await userDB.create({
      username, password
    }).then(async (r) => {
      let _id = r._id
      //新建好友表
      await friendDB.create({
        u_id: _id
      })
      ctx.body = {
        code: 200,
        msg: '注册成功!'
      }
    }).catch(err => {
      console.log(err);
      return ctx.body = {
        code: 403,
        msg: '数据库出错了'
      }
    })
  } catch (err) {
    console.log(err);
    return ctx.body = {
      code: 404,
      msg: '服务器错误!'
    }
  }

})
module.exports = router.routes()
