# shell
## if then elif else fi
```
  #! /bin/sh
  echo "输入 yse 或 no"
  read YES_OR_NO # 读取用户输入保存在变量中 使用变量"$YES_OR_NO"
  if [ "$YES_OR_NO" = "yes" ]; then # 命令和各参数之间必须用空格隔开
    echo "你输入了 yes"
  elif [ "$YES_OR_NO" = "no" ]; then
    echo "你输入了 no"
  else
    echo "你没有输入 yes 或者 no"
  fi # Shell脚本没有{}括号 fi表示if语块结束
    exit 0 # 退出进程
```
## 动态输出版本分支
```
  echo "node: $(node -v)"
  echo "npm: v$(npm -v)"
  echo "branch: $(git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3)"
  echo "branch: $(git branch | grep "*")"
```