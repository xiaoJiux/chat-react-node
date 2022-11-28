const router = require('koa-router')()
const multer = require('@koa/multer');//引入
import path from 'path';
import {userDB} from "../db/user";


const storage1 = multer.diskStorage({ // multer调用diskStorage可控制磁盘存储引擎
  destination: function (req: Request, file: any, cb: any) {
    cb(null, path.join(__dirname, "../public/bgImg"))
  },
  filename: function (req: Request, file: any, cb: any) {
    let typeIndex = [
      "image/gif", "image/jpeg", "image/png"
    ].indexOf(file.mimetype)

    if (typeIndex === -1) {
      cb(new Error("文件格式不正确"))
      return
    }
    let ext = [".gif", ".jpg", ".png"][typeIndex]
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})


const storage2 = multer.diskStorage({ // multer调用diskStorage可控制磁盘存储引擎
  destination: function (req: Request, file: any, cb: any) {
    cb(null, path.join(__dirname, "../public/tx"))
  },
  filename: function (req: Request, file: any, cb: any) {
    let typeIndex = [
      "image/gif", "image/jpeg", "image/png"
    ].indexOf(file.mimetype)

    if (typeIndex === -1) {
      cb(new Error("文件格式不正确"))
      return
    }
    let ext = [".gif", ".jpg", ".png"][typeIndex]
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const limits = {
  fields: 10,
  filesize: 2 * 1024 * 1024,
  files: 1
}

let upload1 = multer({
  storage: storage1, limits: limits
})
let upload2 = multer({
  storage: storage2, limits: limits
})

router.post('/bgImg', upload1.single('bgImg'), async (ctx: any) => {
  // ctx.files 可获取到上传的所有文件信息，type -> Array

  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 1,
      msg: '请先登录'
    }
  }
  try {
    //图片路径
    let filename = '/' + ctx.file.fieldname + '/' + ctx.file.filename
    let doc = await userDB.findByIdAndUpdate(ctx.session.userInfo._id, {
      bgImg: filename
    })
    ctx.session.userInfo.bgImg = filename
    ctx.body = {
      code: 200,
      msg: "背景上传成功"
    }
  } catch (err) {
    console.log(err);
    return ctx.body = {
      code: 404,
      msg: "服务器错误，请稍后再试"
    }
  }
})

router.post('/tx', upload2.single('tx'), async (ctx: any) => {
  // ctx.files 可获取到上传的所有文件信息，type -> Array

  if (!ctx.session.userInfo) {
    return ctx.body = {
      code: 1,
      msg: '请先登录'
    }
  }
  try {
    //图片路径
    let filename = '/' + ctx.file.fieldname + '/' + ctx.file.filename
    let doc = await userDB.findByIdAndUpdate(ctx.session.userInfo._id, {
      tx: filename
    })
    ctx.session.userInfo.tx = filename
    ctx.body = {
      code: 200,
      msg: "背景上传成功"
    }
  } catch (err) {
    console.log(err);
    return ctx.body = {
      code: 404,
      msg: "服务器错误，请稍后再试"
    }
  }
})


module.exports = router.routes()
export {}
