FROM node:10.13-alpine
# 设置环境变量
ENV NODE_ENV production
# 创建app工作目录
WORKDIR /usr/src/app
# 将xxx.json拷贝到工作目录
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# 使用npm安装依赖
RUN npm install --production --silent && mv node_modules ../
# 将当前目录下的所有内容 都复制到工作目录 (根据.dockerignore)
COPY . .
# 对外暴露的端口
EXPOSE 3000
# 容器启动时的指令
CMD npm start
