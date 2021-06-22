# Git [官网](https://git-scm.com/) git是分布式版本控制系统
## 全局信息
```
  // 设置用户名 邮箱只是用来提供commit中作者信息 不涉及权限校验 但是有些公司也会关联权限
  git config --global user.name "zhaoqi" // 设置用户名
  git config --global user.email "154809748@qq.com" // 设置邮箱
  git config -l // 查看信息
  git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" // 设置一个自定义指令 git lg
  // 修改文件名的大小写 git默认对大小写不敏感
  git mv <file_from> <file_to> // 更新目录名 使git能够监听到
  git config core.ignorecase false // 开启git对大小写敏感 默认是true
```
## 创建存储库
```
  git init <dir_name> // 初始化仓库 会在dir_name（默认是当前目录）中创建.git的隐藏目录
  git remote add origin git@github.com:zq0904/public-test.git // 添加 别名 (如果存在多个别名 如何指定某个分支默认的远程 sourcetree -> 设置 -> 编辑配置文件 查看对应分支并修改remote的值)
  git push -u origin master // 把本地仓库推送到远程仓库 并 关联
  // 当用户直接 git pull 或 fetch 时 可以直接跟别名 不跟git默认取的是 关联的别名 地址
  // 可以实现同一个仓库向不同的地址push (如 git push o1  git push o2)(git push 走默认关联的地址)
  git remote -v // 显示详细的 别名映射
  // origin	git@github.com:zq0904/public-test.git (fetch)
  // origin	git@github.com:zq0904/public-test.git (push)
  git remote rename origin newOrigin // 修改 别名
  // newOrigin	git@github.com:zq0904/public-test.git (fetch)
  // newOrigin	git@github.com:zq0904/public-test.git (push)
  git remote set-url origin git@new.address.get // 修改 别名的地址
  // origin	git@new.address.get (fetch)
  // origin	git@new.address.get (push)
  git remote rm origin // 删除 别名
```
## 克隆
```
  git clone git@github.com:zq0904/public-test.git <custom_dir_name>
  git clone git@github.com:zq0904/rn-code-split-demo.git --depth 1 // 文档资料可以浅clone仅保留最近一次commit记录（下载速度会很快）可以在执行git fetch --unshallow获取完整历史记录的仓库
  // 克隆的项目 默认会添加 origin别名
  // origin	git@github.com:zq0904/public-test.git (fetch)
  // origin	git@github.com:zq0904/public-test.git (push)
```
## 查看状态 添加到暂存区 提交到本地 重写
```
  touch 1.js
  git status // 查看状态 红色(文件有更改) 绿色(已经推到暂存区)
  git add . // 将所有更改的文件 添加到暂存区（git@1版本 不能添加删除的文件）
  git add -A // 将所有更改的文件 添加到暂存区（尽量使用）
  git commit -m add:添加1.js // 将暂存区中的文件 提交到当前分支的本地仓库
  git commit --amend // 修改最近一次的提交信息 进入vi模式:wq保存退出就好
  git commit -am update:更新 // 将修改和删除的文件 自动推到暂存区后直接提交（新增的不会 不建议使用）
  // 重写（合并 删除 修改 commit）
  git rebase -i aba0aac // -i 表直接进入vi模式（可以编辑从 该commit_id（不包括） 到最新的commit 之间的信息）
  // vi模式这里是倒序 最近修改的commit在下面

  // pick aba0aac add1
  // s 1f59bfb add2 // 将add2合并到add1中
  // r e3b3fc8 add3 // 修改add3的提交信息
  // # p, pick = use commit 使用该提交
  // # r, reword = use commit, but edit the commit message 使用该提交，但编辑提交信息
  // # e, edit = use commit, but stop for amending 使用该提交，但停止修改
  // # s, squash = use commit, but meld into previous commit 使用该提交，但融合到之前的提交 // 多用于合并多个commit节点
  // # f, fixup = like "squash", but discard this commit's log message 类似于squash，但是放弃这个提交的日志消息
  // # x, exec = run command (the rest of the line) using shell 使用shell运行命令(行其余部分)
  // # d, drop = remove commit 删除提交

  // :wq 保存退出后 会依次进入vi模式 操作编辑合并信息页面 修改信息页面
```
## 拉取 提交 获取
```
  git pull // 拉取代码
  git push // 提交代码到远程
  git fetch // 获取（用于检查本地仓库的状态 保持最新）
  git fetch -p origin // 修剪 git fetch会更新远程分支列表，但默认不会删除远程分支，因为远程分支上不再有对应的分支
```
## 分支
```
  git branch // 查看本地分支
  git branch -a // 查看所有分支
  git branch 20190101_star_zq // 基于当前分支 创建 新分支 (理论上创建分支 都应该基于主干 所以创建分支一般都会切到主干)
  git branch -d 20190101_star_zq // 删除 本地分支 (用户不应该处于这个分支)
  git branch -D 20190101_star_zq // 强制删除 本地分支 (当一个分支没有完全合并删除时git将给予警告)
  git push origin --delete 20190101_star_zq // 删除 远程分支 (注意分支名 不应该包括 remotes/origin/ 这部分)
  git checkout 20190101_star_zq // 切换 分支
  git checkout -b 20190101_star_zq // 创建 并移动到这个 分支
  git checkout -b 20190101_star_zq remotes/origin/20190101_star_zq // 创建并移到这个分支 拉取远程分支 (远程分支必须存在)
  git push origin 本地分支名:远程分支名 // 将本地分支推到远程服务器 (远程分支与本地分支同名 可以简写 git push origin 本地分支名)
  git merge master // 将master 合并到当前分支
  git merge --abort // 撤销合并
```
## 储藏（不想由于切分支而被迫提交）
```
  git stash // 储藏当前变更 （注意：新增的文件不会被储藏 必须先git add）
  git stash save 暂存信息 // 储藏当前变更 添加提示信息
  git stash list // 查看现有储藏 包含一些描述（如在哪个分支上的储藏）
  // stash@{0}: WIP on master: 5424fef Merge branch 'master' of github.com:zq0904/public-test
  git stash apply // 应用最近的储藏 默认只会弹出未提交的文件
  git stash apply stash@{0} // 应用某次储藏（stash@{0}表最新的 应用一个储藏并不会自动删除这个储藏）
  git stash apply --index // 应用最近的储藏 也会弹出被暂存的变更（常用）
  // 应用多个储藏 必须将前一个储藏推到暂存区 才能应用下一个储藏
  git stash drop // 删除最近的储藏
  git stash drop stash@{0} // 删除某次储藏
  git stash clear // 清空所有储藏
  git stash pop stash@{0} --index // 应用某个储藏 同时删除这个储藏（常用）
  git stash show -p stash@{0} | git apply -R // 取消储藏（本质是取消该储藏的补丁 必须指定”对应“的stash@{0}）
  git stash branch <branch_name> stash@{0} // 将某个储藏直接转成分支 如果成功 该储藏自动被删除
```
## 撤销
```
  git diff 1.js // 在git中查看文件的改动 红色是删除的 绿色是添加的
  git log // 查看历史版本
  git log -2 // 查看最近2次的历史版本
  // 撤销 没有推到暂存区的修改 修改和删除 (新增文件不能撤销)
  git checkout -- 1.js // 撤销1.js没有推到暂存区的修改
  git checkout -- . // 撤销所有没有推到暂存区的修改
  // 撤销 add
  git reset HEAD 1.js // 将1.js从 暂存区 中撤销
  git reset HEAD // 撤销所有推到暂存区的更改
  // 撤销 commit
  git reset --hard HEAD~2 // 本地后退2个版本 (回滚后git log不会存储以前的记录 所以需要自己保留commit的历史)
  git reset --hard a9092d160a4a // 后退到固定commit_id的版本
  git push -f // 本地回滚后 强制提交本地分支 达到回滚远程分支的目的
```
## 标签 对于某个重要阶段可以打个标签以提供特别的快照（如包的重大版本更新react@16.8.6）
```
  git tag // 查看所有标签
  git tag v1.0 -m 提交信息 // 创建本地标签（为当前最新的commit打标签） -m 指定提交信息
  git show v1.0 // 查看标签的具体内容
  git tag v0.9 6224937 // 为某个commit打标签
  git push origin v1.0 // 推送一个本地标签到远程
  git push origin --tags // 推送全部未推送过的本地标签到远程
  git tag -d v1.0 // 删除本地标签
  git push origin :refs/tags/v1.0 // 删除远程标签
  git checkout v1.0 // 切换到标签上（不应该修改代码 应该仅用于快速回滚等 如果你希望保留修改应该基于这个标签创建分支）
  git checkout -b branch_name v1.0 // 基于某个标签创建分支
```
## 项目的 子模块（多个git仓库嵌套）
```
  // 添加子模块
  git submodule add -b <branch> <git_url> <local_path> // 为项目在本地添加子模块（会直接克隆子模块到local_path 会在.git/config .git/module/* .gitmodules记录子模块信息） -b表追踪子模块指定的分支
  git submodule add -b master git@github.com:zq0904/test-submodule.git src/test-submodule // 默认就会推到暂存区
  git status
  git commit -m add:添加子模块
  git push // 将子模块推到远程（实际上”只“添加了.gitmodules）

  // 克隆项目 并 初始化 拉取 子模块
  git clone <git_url> --recursive // 克隆的项目 --recursive表递归克隆 会直接克隆子模块（如果项目包含子模块默认是不会克隆子模块 子模块目录为空 整个项目只有.gitmodules描述子模块）

  git clone <git_url>
  git submodule init // 初始化子模块本地配置文件 根据.gitmodules 写入.git/config
  git submodule update // 更新子模块为”项目最新“ 写入.git/module/*
  git submodule update --init // 初始化子模块 更新子模块为”项目最新“

  // !!!（初次clone的项目是必须要执行的） 由于项目的索引仅包含子模块的commitid作为其索引中的特殊条目导致“分离的头” [参考](https://stackoverflow.com/questions/20794979/git-submodule-is-in-detached-head-state-after-cloning-and-submodule-update)
  git submodule foreach -q --recursive 'current_commit_id=$(git rev-parse HEAD); git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo master) && git reset --hard ${current_commit_id}' // 递归操作 所有子模块切换到跟踪的分支 默认master 并 回滚到相应的commit_id（解决所有子模块的 detached head）

  git pull && git submodule update // 更新项目 并 更新子模块为”项目最新“

  // 更新子模块（项目中的子模块有了更新后，项目必须手动更新才能应用最新的子模块）
  // 1.1 在包含子模块的项目上工作 不修改子模块 只更新子模块
  git submodule update --remote // 更新所有子模块为”远端最新“ 或者（cd 到相应子模块中 git pull 更新子模块）
  git submodule update --remote src/test-submodule // 更新指定的子模块为”远端最新“
  cd 项目根目录
  git add -A
  git commit -m update:更新子模块
  git push

  // 1.2 在子模块上工作
  // 如果我们在主项目中提交并推送但并不推送子模块上的改动，其他尝试检出我们修改的人会遇到麻烦，因为他们无法得到依赖的子模块改动。（你仍应该将子模块完全push后 再在父模块中暂存提交这个子模块）
  git push --recurse-submodules=check // 推送主项目前 检查所有子模块是否都已推送 如果没有推送那么会直接导致项目push失败
  git push --recurse-submodules=on-demand // 推送主项目前 “尝试”先推送所有子模块 在推送项目

  // 删除子模块
  rm -rf src/test-submodule // 删除子模块的目录
  vim .gitmodules // 删除相关子模块信息
  vim .git/config // 删除相关子模块信息
  rm .git/module/src/test-submodule // 删除git存储的子模块
  git rm -f --cached src/test-submodule // 删除子模块的跟踪
  git add -A
  git commit -m del:删除子模块
  git push

  // 修改.gitmodules
  git config -f .gitmodules submodule.src/test-submodule.branch master
```
## .gitignore文件 项目根目录新建.gitignore指定忽略的文件
```
  git rm -f --cached './曾经的东西/Promise/node_modules/*' // 取消跟踪某个文件（如果之前就跟踪了某个文件 之后想通过.gitignore忽略它 默认git是不会忽略该文件的 必须执行该命令）
```
## 使用SSH连接到GitHub git push等操作 免账号密码 (参考)[https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh]
```
  ls -al ~/.ssh // 查看是否有现成的SSH密钥 id_rsa 密钥 id_rsa.pub 公钥
  ssh-keygen -t rsa -b 4096 -C "154809748@qq.com" -f ~/.ssh/id_rsa // 一路回车 将在 ~/.ssh 生成密钥公钥 -t 加密方式 -f 输出文件名
  // 在github settings keys 中添加生成的 公钥 (https://github.com/settings/keys New SSH key)

  使用ssh 关联 多个托管平台（git gitlab igit）
  通过 ssh clone 项目时 git@igit.58corp.com:wuxianfe/message-center-h5.git @前为User 后为Host
  vim ~/.ssh/config

  Host github.com # 别名
  HostName github.com # 域名
  IdentityFile ~/.ssh/id_rsa # 使用的密匙位置
  PreferredAuthentications publickey # 登录时用什么权限认证
  User git

  Host igit.58corp.com
  HostName igit.58corp.com
  IdentityFile ~/.ssh/zq_igit
  PreferredAuthentications publickey
  User git

  注意只有使用 ssh git@igit.58corp.com:wuxianfe/message-center-h5.git 才会走config http的方式需要输入账号密码

  ssh -T github.com // 检测连接 如成功 Hi zq0904! You've successfully authenticated, but GitHub does not provide shell access.

```
