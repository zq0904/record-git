# SVN [官网](http://subversion.apache.org/)
## 命令
```code
  svn help <command> // 某个命令的帮助
  svn --version // 显示版本信息
  svn --version --quiet // 显示版本号
  svn up // svn update 当前目录及其以下更新到最新版本
  svn st <file_path> // svn status 查看某个目录下的变更状态 默认当前目录下
  // M修改 D删除 ?没控制 !是手动删除svn没有监听到 C冲突 A预定加入版本库 K锁定
  svn add <file_path> // 将新创建文件添加到版本控制中(还要使用ci才能真正提交)
  svn add . --force // 递归添加所有文件(除忽略文件)到版本控制
  svn del <file_path> // svn delete 删除
  svn ci -m '信息' // svn commit -m '提交信息' (默认提交所有修改)
  svn ci -m '信息' <file_path> // 提交某个目录下的文件
  svn lock -m '信息' <file_path> [--force] // 加锁
  svn unlock <file_path> // 解锁
  svn revert <file_path> // 丢弃文件更改(还没有提交的)
  svn revert <folder_path> -R // 丢弃整个目录更改
  svn diff // 当前工作区的所有改动
  svn blame <file_path> // 显示文件每一行最后是谁修改的
  svn ls // 查看文件列表目录
  svn cp -m '信息' <base_branch_url> <new_branch_url> // 新建分支 svn copy -m '新建一个test分支' https://svn.lietou.com/svn/fe/fe-passport-pc/trunk https://svn.lietou.com/svn/fe/fe-passport-pc/branches/20181228_zhaoqi_test
  svn co <new_branch_url> // svn checkout 检出分支(类似git clone)
  svn merge <branch_url> //  将<branch_url>合并到当前分支(一般先更新svn up 在合并)
  svn resolved <file_path> // 标识解决冲突完成 才能在次提交
  svn del -m '信息' <branch_url> // 删除分支
  svn upgrade // 客户端svn版本高 本地检出的.svn版本低 使用该命令升级工作副本
  svn log -l 3 // 列出最近3条提交记录
  svn up -r 58717 // 回滚到 58717版本
  svn merge -r <current_version>:<to_version> <file_path> // 将当前版本回滚至<to_version> <file_path>可取''或. 表整个项目 也可以指定为某个文件
  svn merge -r r58721:r58719 '' // 回滚整个项目
  svn merge -r r58721:r58719 v5/src/pages/h.pc/index.js // 仅回滚这一个文件
```