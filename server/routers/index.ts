const router = require('koa-router')();


//注册路由
router.use("/reg", require('./User/register'))

//登录路由
router.use("/login", require('./User/login'))

//好友有关路由
router.use('/friend', require('./User/friend'))

//上传
router.use("/uploader", require('./uploader'))

//设置用户信息
router.use('/setInfo', require('./User/setInfo'))

//聊天路由
router.use('/chart', require('./Chat/chartSearch'))

//文章动态路由
router.use('/article', require('./Article/article'))


module.exports = router
