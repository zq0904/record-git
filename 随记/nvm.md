# nvm
## 安装
  1. 执行 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
  2. 在.zshrc中添加
  export NVM_DIR="$HOME/.nvm" # nvm命令执行路径
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  3. source ~/.zshrc 更新文件
  4. nvm --version 测试是否安装成功
## 使用
```code
  nvm --version // 查看版本是否安装成功
	nvm install --lts // 安装最新的LTS（长期支持版）
  nvm ls-remote --lts // 查看远程可安装长期支持版
  nvm install v10.15.3 // 安装指定node版本 (如遇 prefix报错 执行 nvm use --delete-prefix v10.15.3)
  nvm alias default v10.15.3 // 设置在任何新shell中使用的默认node版本
  nvm ls // 已安装的版本
  nvm current // 当期选择的版本
  nvm use v10.15.3 // 切换相应的node版本

  // 卸载
  nvm uninstall 8.16.0 // 卸载已安装的node版本
```

