(function ($) {

    window.webuploader = function (id, server) { // 容器id

        var globalVar = id.substr(1); // 全局变量

        var $wrap = $(id),
            $queue = $('<ul class="filelist"></ul>').appendTo($wrap.find('.queueList')), // 预览图片容器
            $statusBar = $wrap.find('.statusBar'), // 状态栏 (包括 进度条 按钮)
            $info = $statusBar.find('.info'), // 文件信息
            $upload = $wrap.find('.uploadBtn'), // 上传按钮
            $placeHolder = $wrap.find('.placeholder'), // 没选择文件之前的内容
            $progress = $statusBar.find('.progress').hide(), // 进度条隐藏
            fileCount = 0, // 记录添加文件的数量
            fileSize = 0, // 记录添加文件的总大小
            ratio = window.devicePixelRatio || 1, // 设备像素比
            thumbnailWidth = 100 * ratio, // 图片缩略图大小
            thumbnailHeight = 100 * ratio,
            state = 'pedding', // 状态值 pedding , ready （准备好）, uploading （上传）, confirm （确认）, done （完成）
            percentages = {}, // 所有文件的进度信息，key为file id
            // 检测浏览器是否支持图片的base64
            isSupportBase64 = (function () {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function () { // 成功加载或者报错 都将调用
                    if (this.width != 1 || this.height != 1) { // 如果成功加载 图片的宽高默认就是1
                        support = false;
                    }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
            })(),
            uploader;

        // 实例化
        uploader = WebUploader.create({
            // auto: true, // 选完文件后自动上传
            swf: './Uploader.swf', // swf文件路径
            server: server, // 提交地址url
            pick: { // 未选择图片之前的
                id: id + ' .filePicker', // 按钮 id
                label: '选择图片', // 文本
                multiple: true, // 同时选择多个文件
            },
            formData: { // 跟随发送请求的其余参数
            },
            dnd: id + ' .dndArea', // 指定拖拽到哪个容器
            paste: document.body, // 通过粘贴来添加截屏的图片 建议设置为document.body
            accept: { // 只允许选择图片格式
                title: 'Images',
                extensions: 'jpg,jpeg,png,gif', // 允许后缀
                mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif' // mime类型
            },
            thumb: { // 配置生成缩略图的选项
                width: 100,
                height: 100,
                type: 'image/jpg,jpeg,png,gif'
            },
            fileNumLimit: 2, // 限制上传个数
            resize: false, // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传
            disableGlobalDnd: true, // 禁用整个网页的拖拽功能 避免图片拖拽进来直接被浏览器打开
            fileSizeLimit: 200 * 1024 * 1024, // 文件总大小超出 200M 不允许加入队列
            fileSingleSizeLimit: 50 * 1024 * 1024 // 单个文件超出 50M 不允许加入队列
            // chunked: true, // 开起分片上传
            // chunkSize: 512 * 1024, // 分片大小为5M
        });

        // 拖拽时不接受 js txt 文件
        uploader.on('dndAccept', function (items) {
            var denied = false,
                len = items.length,
                i = 0,
                unAllowed = 'text/plain;application/javascript '; // 修改js类型
            for (; i < len; i++) {
                if (~unAllowed.indexOf(items[i].type)) { // 如果在列表里面
                    denied = true;
                    break;
                }
            }
            return !denied;
        });
        // 选择文件 弹框打开时
        uploader.on('dialogOpen', function () {
            console.log('dialogOpen');
        });
        // 准备好时调用  开到全局
        uploader.on('ready', function () {
            window[globalVar] = uploader;
        });
        // 添加“添加文件”的按钮，
        uploader.addButton({
            id: id + ' .filePicker2',
            label: '继续添加'
        });

        // 创建view视图
        function addFile(file) {
            var $li = $('<li id="' + file.id + '">' +
                    '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>' +
                    '<p class="progress"><span></span></p>' +
                    '</li>'),
                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                $prgress = $li.find('p.progress span'), // 进度条 芯
                $wrap = $li.find('p.imgWrap'), // 包裹 img预览图的容器
                $info = $('<p class="error"></p>'), // 报错信息容器
                // 填充错误文本
                showError = function (code) {
                    switch (code) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;
                        case 'interrupt':
                            text = '上传暂停';
                            break;
                        default: // 'http'
                            text = '上传失败，请重试';
                            break;
                    }
                    $info.html(text).appendTo($li);
                };
            if (file.getStatus() === 'invalid') {
                showError(file.statusText);
            } else {
                $wrap.text('预览中');
                // 生成缩略图
                uploader.makeThumb(file, function (error, src) {
                    var img;
                    if (error) {
                        $wrap.text('不能预览');
                        return;
                    }
                    if (isSupportBase64) { // 是否支持base64 支持
                        img = $('<img src="' + src + '">');
                        $wrap.empty().append(img);
                    }
                }, thumbnailWidth, thumbnailHeight); // 缩略图大小
                percentages[file.id] = [file.size, 0]; // 进度百分比
                file.rotation = 0; // 旋转的角度 自定义的属性
            }

            file.on('statuschange', function (cur, prev) { // cur当前文件状态 prev上一次文件状态
                // 文件添加进队列准备 queued  上传中 progress  上传完成 complete  上传失败 error
                if (prev === 'progress') { // 上传完成
                    $prgress.hide().width(0); // 进度条 芯 设置为隐藏
                } else if (prev === 'queued') { // 上传中 解绑鼠标移入移出事件 清除$btns
                    $li.off('mouseenter mouseleave');
                    $btns.remove();
                }
                // 当前上传的状态
                if (cur === 'error' || cur === 'invalid') {
                    showError(file.statusText);
                    percentages[file.id][1] = 1; // 进度100%
                } else if (cur === 'interrupt') {
                    showError('interrupt');
                } else if (cur === 'queued') {
                    $info.remove();
                    $prgress.show();
                    percentages[file.id][1] = 0;
                } else if (cur === 'progress') {
                    $info.remove();
                    $prgress.show();
                } else if (cur === 'complete') {
                    $prgress.hide().width(0);
                    $li.append('<span class="success"></span>');
                }
                $li.removeClass('state-' + prev).addClass('state-' + cur);
            });
            // 给每个li注册鼠标移入移出事件
            $li.on('mouseenter', function () {
                $btns.stop().animate({ height: 30 });
            });
            $li.on('mouseleave', function () {
                $btns.stop().animate({ height: 0 });
            });
            // 给旋转 删除 按钮组 添加点击事件
            $btns.on('click', 'span', function () {
                var index = $(this).index();
                switch (index) {
                    case 0: // 删除
                        uploader.removeFile(file);
                        return;
                    case 1: // 顺时针旋转
                        file.rotation += 90;
                        break;
                    case 2: // 逆时针旋转
                        file.rotation -= 90;
                        break;
                }
                $wrap.css({
                    '-webkit-transform': 'rotate(' + file.rotation + 'deg)',
                    '-mos-transform': 'rotate(' + file.rotation + 'deg)',
                    '-o-transform': 'rotate(' + file.rotation + 'deg)',
                    'transform': 'rotate(' + file.rotation + 'deg)'
                });
            });
            $li.appendTo($queue);
        }
        // 销毁view视图
        function removeFile(file) {
            var $li = $('#' + file.id);
            delete percentages[file.id];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }
        // 更新 进度条
        function updateTotalProgress() {
            var loaded = 0,
                total = 0, // 总数
                spans = $progress.children(),
                percent;
            $.each(percentages, function (i, e) {
                total += e[0];
                loaded += e[0] * e[1];
            });
            percent = total ? loaded / total : 0;
            spans.eq(0).text(Math.round(percent * 100) + '%');
            spans.eq(1).css('width', Math.round(percent * 100) + '%');
            updateStatus();
        }
        // 更新状态
        function updateStatus() {
            var text = '',
                stats;
            if (state === 'ready') {
                text = '选中' + fileCount + '张图片，共' + WebUploader.formatSize(fileSize) + '。';
            } else if (state === 'confirm') {
                stats = uploader.getStats();
                if (stats.uploadFailNum) {
                    text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                    if (stats.uploadFailNum == 0) {

                    } else {
                        // alert("照片上传失败");

                    }
                }
            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '张（' + WebUploader.formatSize(fileSize) + '），已上传' + stats.successNum + '张，失败' + stats.uploadFailNum + '张';
            }
            $info.html(text);
        }
        // 设置状态
        function setState(val) {
            var stats;
            if (val === state) {
                return false;
            }
            $upload.removeClass('state-' + state).addClass('state-' + val);
            state = val;
            switch (state) {
                case 'pedding': // 无关紧要的
                    $placeHolder.removeClass('element-invisible');
                    $queue.hide();
                    $statusBar.addClass('element-invisible');
                    uploader.refresh();
                    break;
                case 'ready': // 准备好的
                    $placeHolder.addClass('element-invisible');
                    $(id + ' .filePicker2').removeClass('element-invisible');
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh();
                    break;
                case 'uploading': // 上传
                    $(id + ' .filePicker2').addClass('element-invisible');
                    $progress.show();
                    $upload.text('暂停上传');
                    break;
                case 'paused': // 暂停
                    $progress.show();
                    $upload.text('继续上传');
                    break;
                case 'confirm': // 确认
                    $progress.hide();
                    $(id + ' .filePicker2').removeClass('element-invisible');
                    $upload.text('开始上传');
                    stats = uploader.getStats();
                    if (stats.successNum && !stats.uploadFailNum) {
                        setState('finish');
                        return;
                    }
                    break;
                case 'finish': // 结束
                    stats = uploader.getStats();
                    if (!stats.successNum) { // 如果一个文件都没有上传成功
                        state = 'done';
                    }
                    break;
            }
            updateStatus();
        }
        // 上传过程中触发，携带上传进度
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span'); // 进度条 芯
            $percent.css('width', percentage * 100 + '%');
            percentages[file.id][1] = percentage;
            updateTotalProgress();
        });
        // 当文件被加入队列后触发
        uploader.on('fileQueued', function (file) {
            fileCount++;
            fileSize += file.size;
            if (fileCount === 1) { // 当第一次加入文件时 显示进度条
                $placeHolder.addClass('element-invisible');
                $statusBar.show();
            }
            addFile(file);
            setState('ready');
            updateTotalProgress();
        });
        // 当文件被移除队列后触发
        uploader.on('fileDequeued', function (file) {
            fileCount--;
            fileSize -= file.size;
            if (!fileCount) {
                setState('pedding');
            }
            removeFile(file);
            updateTotalProgress();
        });
        // 所有的事件都会触发
        uploader.on('all', function (type) {
            switch (type) {
                case 'uploadFinished':
                    setState('confirm');
                    break;
                case 'startUpload':
                    setState('uploading');
                    break;
                case 'stopUpload':
                    setState('paused');
                    break;
            }
        });
        // 报错调用
        uploader.on('error', function (code) {
            window.alert('Eroor: ' + code);
        });
        // 上传按钮 点击事件
        $upload.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if (state === 'ready') {
                uploader.upload();
            } else if (state === 'paused') {
                uploader.upload();
            } else if (state === 'uploading') {
                uploader.stop();
            }
        });
        // 尝试再次请求上传
        $info.on('click', '.retry', function () {
            uploader.retry();
        });
        $info.on('click', '.ignore', function () {
            window.alert('ignore');
        });
        $upload.addClass('state-' + state);
        updateTotalProgress();

    }
})(jQuery);
