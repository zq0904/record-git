(function ($, TweenMax, Delaunay) {

  $.fn.broken = function (options) {
    
    const _default = {
      urls: [], // 图片url
      images: [], // 图片jq对象 数组
      imageIndex: 0, // 当前要展示的 图片索引
      direction: true, // 图片播放方向 默认正向
      $image: null, // 当前图片
      clickPosition: [], // 点击的位置
      vertices: [], // 点位
      indices: [], // 指数
      fragments: [], // 碎片
      $container: this.css('position', 'relative'), // 容器
      containerWidth: null, // 容器宽
      containerHeight: null,
      timeId: null, // 定时器ID
      time: 3000 // 定时器时间 建议设置大于3000ms
    };

    let {
      urls,
      images,
      imageIndex,
      direction,
      $image,
      clickPosition,
      vertices,
      indices,
      fragments,
      $container,
      containerWidth,
      containerHeight,
      timeId,
      time
    } = $.extend(_default, options);

    if (urls.length === 0) throw new Error('urls为必填项');

    TweenMax.set($container, { perspective: 500 }); // 设置透视图
    // 保证 所有图片加载完成
    const loadImg = url => new Promise((resolve, reject) => {
      const img = new Image()
      images.push($(img))
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('图片加载错误'))
      img.src = url
    })
    Promise.all(urls.map(v => loadImg(v))).then(list => placeImage())
    // 放置图片
    function placeImage() {
      $image = images[imageIndex]; // 拿到当前图片
      $image
        .on('click', clickImageHandler)
        .on('mouseenter', () => clearInterval(timeId))
        .on('mouseleave', () => timeId = setInterval(intervalHandler, time));
      $container.append($image);
      containerWidth = $container.width(); // 保证图片撑开容器 在获取高度
      containerHeight = $container.height();
    }
    // 通过 当前方向 设置 图片索引
    function setImageIndexByDirection() {
      if (direction && ++imageIndex === images.length) imageIndex = 0 // 正向 图片为最后一张 索引置0
      if (!direction && --imageIndex === -1) imageIndex = images.length - 1 // 反向 图片为第一张
    }
    function clickImageHandler(e) {
      direction = e.offsetX > containerWidth / 2; // 点击位置 偏右 正向 偏左 负向
      clickPosition = [e.offsetX, e.offsetY]; // 点击点位距容器的距离
      setImageIndexByDirection()
      triangulate();
      shatter();
    }
    function intervalHandler() {
      clickPosition = [randomRange(containerWidth / 8, containerWidth * 7 / 8), randomRange(containerHeight / 8, containerHeight * 7 / 8)]; // 容器内随机取得点位
      setImageIndexByDirection()
      triangulate();
      shatter();
    }
    timeId = setInterval(intervalHandler, time)
    // min max 之间的随机数 不包min max
    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    // 限制 x 介于 min max 之间 (限制点位不能超出容器边界)
    function clamp(x, min, max) {
      return x < min ? min : x > max ? max : x;
    }
    // 标志
    function sign(x) {
      return x < 0 ? -1 : 1;
    }
    // 划分三角形
    function triangulate() {
      // rings 圆 r 半径 c 份数
      var rings = [{ r: 50, c: 12 }, { r: 150, c: 12 }, { r: 300, c: 12 }, { r: 1200, c: 12 }],
        x,
        y,
        centerX = clickPosition[0],
        centerY = clickPosition[1];
      vertices.push([centerX, centerY]); // 第一个点位 为点击的点位
      rings.forEach(v => {
        var radius = v.r, count = v.c,
          variance = radius * 0.25; // 随机偏移值
        for (var i = 0; i < count; i++) {
          x = centerX + radius * Math.cos(2 * Math.PI * i / count) + randomRange(-variance, variance);
          y = centerY + radius * Math.sin(2 * Math.PI * i / count) + randomRange(-variance, variance);
          vertices.push([x, y]); // 其余点位
        }
      });
      indices = Delaunay.triangulate(vertices.map(v => [clamp(v[0], 0, containerWidth), clamp(v[1], 0, containerHeight)]));
    }
    // 破碎动画
    function shatter() {
      var p0, p1, p2, fragment; // 三角形 3个点坐标 当前的碎片
      var tl0 = new TimelineMax({ onComplete: shatterCompleteHandler }); // 破碎动画完成时的回调
      for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];
        fragment = new Fragment(p0, p1, p2);
        var dx = fragment.centroid[0] - clickPosition[0],
          dy = fragment.centroid[1] - clickPosition[1],
          d = Math.sqrt(dx * dx + dy * dy),
          rx = 300 * sign(dy),
          ry = 900 * -sign(dx),
          delay = d * 0.003 * randomRange(0.1, 0.25);
        fragment.canvas.style.zIndex = Math.floor(d).toString();
        var tl1 = new TimelineMax();
        tl1.to(fragment.canvas, randomRange(0.25, 1), {
          z: randomRange(-1500, 1500),
          rotationX: rx,
          rotationY: ry,
          x: randomRange(-2000, 2000),
          y: randomRange(-2000, 2000),
          ease: Expo.easeIn
        });
        tl1.to(fragment.canvas, 0.4, { alpha: 0 }, 0.6);
        tl0.insert(tl1, delay);
        fragments.push(fragment);
        $container.append(fragment.canvas);
      }
      $image.css('visibility', 'hidden'); // 隐藏仍占据位置 撑开容器
    }
    // 破碎动画完成时的回调
    function shatterCompleteHandler() { // 初始化 重新放置图片
      $image.off('click', clickImageHandler).remove().css('visibility', 'visible');
      fragments.forEach(f => $(f.canvas).remove());
      indices.length = 0;
      vertices.length = 0;
      fragments.length = 0;
      placeImage();
    }
    // 碎片构造函数
    const Fragment = function (v0, v1, v2) {
      this.v0 = v0;
      this.v1 = v1;
      this.v2 = v2;
      this.computeBoundingBox();
      this.computeCentroid();
      this.createCanvas();
      this.clip();
    };
    Fragment.prototype = {
      computeBoundingBox: function () {
        var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]), // 3点 x最小值
          xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
          yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
          yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);
        this.box = { x: xMin, y: yMin, w: xMax - xMin, h: yMax - yMin };
      },
      computeCentroid: function () {
        var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
          y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
        this.centroid = [x, y];
      },
      createCanvas: function () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.box.w;
        this.canvas.height = this.box.h;
        this.canvas.style.width = this.box.w + 'px';
        this.canvas.style.height = this.box.h + 'px';
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = this.box.x + 'px';
        this.canvas.style.top = this.box.y + 'px';
        this.ctx = this.canvas.getContext('2d');
        $(this.canvas).css({ // 背面不可见
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          '-moz-backface-visibility': 'hidden',
          '-ms-backface-visibility': 'hidden'
        })
      },
      clip: function () {
        this.ctx.translate(-this.box.x, -this.box.y); // 重新映射 起点坐标
        this.ctx.beginPath(); // 开启新路径
        this.ctx.moveTo(this.v0[0], this.v0[1]);
        this.ctx.lineTo(this.v1[0], this.v1[1]);
        this.ctx.lineTo(this.v2[0], this.v2[1]);
        this.ctx.closePath(); // 关闭路径
        this.ctx.clip(); // 裁剪之后绘制图片 会限制在区域内
        this.ctx.drawImage($image[0], 0, 0, containerWidth, containerHeight);
      }
    };

    return this;
  }

})(jQuery, TweenMax, Delaunay);
