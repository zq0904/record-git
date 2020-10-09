## 调试技巧

### 开发环境下集成 vconsole | eruda
### 调试webeview
  - android（android4及以下不支持）
    1. 使用usb连接手机和电脑 一般会提示输入密码解锁设备可信任
    2. 下载安装测试包（测试包开发者选项 打开WebView远程调试）
    3. 打开手机usb调试（以小米10为例 设置 -> 更多设置 -> 开发者选项 -> 打开 USE调试）
    4. mac端 打开chrome浏览器 输入 chrome://inspect/#devices （需要翻墙!!!）
      - 调试手机中的chrome浏览器h5页面（Chrome 输入url Open）点击inspect查看
      - 调试webview 在手机app内部打开webview（WebView in XXX）点击inspect查看
  - ios（ios12及以下不支持）
    + 调试app内部的h5页面（只能调试测试包）
      1. 使用usb连接手机和电脑 一般会提示输入密码解锁设备可信任
      2. 下载安装测试包 打开测试包闪退问题 [参考](https://github.com/devdawei/libstdc-) 在app内打开要调试的页面
      3. mac端 打开safari浏览器 -> 偏好设置 -> 高级 -> 勾选 在菜单栏中显示“开发”菜单
      4. mac端 打开safari浏览器 -> 开发 -> 手机名称（如果没有可以尝试重启safari浏览器）-> 相应网页
    + 调试safari的页面（真机也可以调试）
      1. 使用usb连接手机和电脑 一般会提示输入密码解锁设备可信任
      2. iphone手机 设置 -> safari浏览器 -> 高级 -> 开启 网页检查器
      3. mac端 打开safari浏览器 -> 偏好设置 -> 高级 -> 勾选 在菜单栏中显示“开发”菜单
      4. mac端 打开safari浏览器 -> 开发 -> 手机名称（如果没有可以尝试重启safari浏览器）-> 相应网页
### mac Simulator 模拟器调试
  1. 设置iphone语言 设置 -> 通用 -> 语音与地区 -> iPhone语言 选择简体中文
  2. charles与模拟器配合使用
    - 1.打开safari浏览器 chls.pro/ssl 安装证书 2.设置->通用->描述文件 选择 安装 3.设置->通用->关于本机->证书信任设置 勾选相应证书
    - 请求(走/不走)charles失效 尝试重启模拟器
  
