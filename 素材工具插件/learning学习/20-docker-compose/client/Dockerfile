FROM nginx

# 将./dist目录下的内容 拷贝到容器中nginx/html
COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]