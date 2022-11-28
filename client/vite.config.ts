import {defineConfig} from 'vite'
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8088,
    proxy: {
      '/is': {
        target: 'http://',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/is/, '')
      }
    }
  },
  build: {
    rollupOptions: { // 配置rollup的一些构建策略
      output: { // 控制输出
        // 在rollup里面, hash代表将你的文件名和文件内容进行组合计算得来的结果
        assetFileNames: "[hash].[name].[ext]"
      }
    },
    assetsInlineLimit: 4096000, // 4000kb,低于4096kb的图片会被转换为base64位字符
    outDir: "dist",//导出目录名字
    assetsDir: "static",//配置静态资源存放目录
  },
})


