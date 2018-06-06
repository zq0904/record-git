$(function () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/year',
    dataType: 'json',
    data: {
      city: '邢台市'
    },
    success: function (data) {
      if (data.ret != 0) return console.log('ajax请求失败');

      var response = data.data.list;
      var dataSource = new Array(); // 数据组装 数据源
      var time = new Date(Number(data.data.startTime));
      var year = time.getFullYear(); // 初始值
      var month = time.getMonth();
      var day = time.getDate();
      var nowAqi = $('.contaminants .on').data('val'); // 默认
      response.forEach(function (e, i, a) {
        dataSource.push({
          e:e, // 存储对象
          color: AQIColor(nowAqi, e[nowAqi]),
          startDate: new Date(year, month, day), // 选择对应的一段日期
          endDate: new Date(year, month, day)
        })
        if (isLastDay(year, month, day)) { // 判断当前day是不是当月的最后一天
          month ++
          day = 1;
        } else {
          day ++
        }
        if (month == 12) { // 刚由 12月份 到13月份  月份清0 年加1
          month = 0
          year ++
        }
      });
      calendarPlug(new Date().getFullYear(), dataSource);

      // 污染物 选择 (只有dataSource数据源存在了 才能进行点击)
      $('.contaminants li').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        var aqi = $(this).data('val'); // 当前污染物
        dataSource.forEach(function (e, i, a) {
          dataSource[i].color = AQIColor(aqi, e.e[aqi]); // 仅仅是颜色的变更
        })
        calendarPlug(Number($('.year-title').parent().children()[3].innerHTML), dataSource);
      });

    }
  });
});

// 空气日历插件封装
function calendarPlug(startYear, dataSource) {
  $('#calendar').empty();
  $('#calendar').calendar({
    startYear: startYear, // 日历应该打开的年份
    style: 'background', // 数据源 背景展示
    dataSource: dataSource,
    mouseOnDay: function(e) { // 鼠标移入事件 e.events对应的数据源 [{...}]  e.date对应的标准时间  e.element对应的元素
        if(e.events.length > 0) {
            var item = e.events[0].e;
            var content = '';
            for(var i in e.events) {
                content += '<ul class="trigger">\
                              <li>' + e.events[0].endDate.template('yyyy-MM-dd') + '</li>\
                              <li>首要污染物: ' + AQIName(firstMax(item)) + '</li>\
                              <li>AQI: ' + item.aqi + '</li>\
                              <li>PM2.5: ' + item.pm25 + '</li>\
                              <li>PM10: ' + item.pm10 + '</li>\
                              <li>SO2: ' + item.so2 + '</li>\
                              <li>NO2: ' + item.no2 + '</li>\
                              <li>CO: ' + item.co + '</li>\
                              <li>O3: ' + item.o3 + '</li>\
                            </ul>';
            }
            $(e.element).popover({ 
                trigger: 'manual',
                container: 'body',
                html: true,
                content: content
            });
            $(e.element).popover('show');
        }
    },
    mouseOutDay: function(e) { // 鼠标移出事件
      if(e.events.length > 0) { // 有数据源移出隐藏
        $(e.element).popover('hide');
      }
    },
    renderEnd: function (e) { // 日历加载完成之后执行
      // 记录每个月 优良等标识
      $('.month-container').children().each(function (i, e) { // 12个月 + 12优良
        if (i%2 === 0) { // 取12个月
          var o = {}; // 计数器
          $(e).find('.day-start').each(function (i, e) {
            var background = $(e).css('background-color');
            if (o[background]) {
              o[background] ++;
            } else {
              o[background] = 1;
            }
          });
          $(e).parent().find('.singleSpan_text').each(function (i, e) { // 12优良
            var $e = $(e); // 优化
            $e.html(o[$e.css('background-color')]); // 填入出现次数
          });

          // 当月没有数据的不显示
          if (!$(e).find('.day-start').toArray().length) {
            $(e).parent().children('.calendar_pollNum').css({'display': 'none'});
          }

        }
      });

      // 检索全年 优良等标识
      var arr = [0, 0, 0, 0, 0, 0];
      $('.calendar_pollNum').each(function (i, e) {
        if ($(e).css('display') != 'none') {
          $(e).find('.singleSpan_text').each(function (i, e) {
            arr[i] = arr[i] + Number(e.innerHTML);
          })
        }
      })
      $('.allYearStatistics').children().each(function (i, e) {
        e.innerHTML = arr[i]
      })

      // 点击月份事件 为了优化 拿到数据在绑定事件 可是容易造成事件多次绑定
      $('#calendar').off('click');
      $('#calendar').on('click', '.month-title', function () {
        $('#myModal .modal-body').empty();
        var $cloneMonth = $(this).parent().parent().parent().parent().clone();
        var text = $cloneMonth.find('.month-title').html() + '份 ' + $('.contaminants .on').html();
        $cloneMonth.find('.month-title').html(text);
        $('#myModal .modal-body').append($cloneMonth);
        $('#modalButton').click();
      });

    }
  });
}

// 有害物 数值颜色转换
function AQIColor(name, value) {
    var colors = ['rgb(204, 204, 204)', "rgb(67, 206, 23)", "rgb(239, 220, 49)", "rgb(255, 170, 0)", "rgb(255, 64, 26)", "rgb(210, 0, 64)", "rgb(156, 10, 78)"];
    var array;
    switch (name) {
        case 'aqi':
            array = [0, 50, 100, 150, 200, 300, 400, 500];
            break;
        case 'pm25':
            array = [0, 35, 75, 115, 150, 250, 350, 500];
            break;
        case 'pm10':
            array = [0, 50, 150, 250, 350, 420, 500, 600];
            break;
        case 'so2':
            array = [0, 50, 150, 475, 800, 1600, 2100, 2620];
            break;
        case 'no2':
            array = [0, 100, 200, 700, 1200, 2340, 3090, 3840];
            break;
        case 'co':
            array = [0, 5, 10, 35, 60, 90, 120, 150];
            break;
        case 'o3':
            array = [0, 160, 200, 300, 400, 800, 1000, 1200];
                  -1   
            break;
    }
    for (var i = 0; i < colors.length; i++) { // i最大能取到6
        if (Number(value) <= array[i]) {
          return colors[i];
        }
    }
    return colors[6]
}
// #ccc    rgb(204, 204, 204) 断线
// #43ce17 rgb(67, 206, 23) 优
// #efdc31 rgb(239, 220, 49) 良
// #fa0    rgb(255, 170, 0) 轻度
// #ff401a rgb(255, 64, 26) 中度
// #d20040 rgb(210, 0, 64) 重度
// #9c0a4e rgb(156, 10, 78) 严重

// 判断day是不是当月的最后一天
function isLastDay(year, month, day) { // 月份 0 开始
  var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 == 0) && (year % 100 != 0) || year % 400 == 0) {
    arr[1] = 29;
  }
  return arr[month] === day;
}
// 日期格式化
Date.prototype.template = function(p) { // new Date('时间戳').template('yyyy-MM-dd hh:mm:ss');
    var f = {
        "y+": this.getFullYear(), // + 代表正则中的至少出现一次
        "M+": this.getMonth() + 1,
        "d+": this.getDate(), // 1-31
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds(),
        "H": (this.getHours() % 12), // 12小时制
        "A": (this.getHours() / 12) <= 1 ? "AM" : "PM" // 是上午还是下午
    };
    var template = p;
    for (var key in f) {
        var reg = new RegExp("(" + key + ")"); // + 贪婪模式
        if (reg.test(template)) {
            var zero = ""; // 重置 转字符串
            for (var i = 0; i < RegExp.$1.length; i++) { // hhh  000
                zero += 0;
            }
            var replace = RegExp.$1.length == 1 ? f[key] : (zero + f[key]).substr((("" + f[key]).length)); // 模板一位简写模式 模板非一前补0 '0002'.substr(1) 002
            template = template.replace(RegExp.$1, replace);
        }
    }
    return template;
};
// 判断首要污染物
function firstMax(e) { // {aqi:'20', 'pm25':'120'}
  var arr = new Array();
  $('.contaminants li').each(function (i, e) {
   arr.push($(e).data('val'));
  });
  var max = Number(e[arr[0]]);
  var maxIndex = 0;
  arr.forEach(function (item, i) {
    if (Number(e[item]) >= max) {
      max = Number(e[item]);
      maxIndex = i;
    }
  });
  return arr[maxIndex];
}
// 有害物 名字转换
function AQIName(name) {
    var str;
    switch (name) {
        case 'aqi':
            str = 'AQI'
            break;
        case 'co':
            str = 'CO'
            break;
        case 'no2':
            str = 'NO2'
            break;
        case 'o3':
            str = 'O3'
            break;
        case 'pm10':
            str = 'PM10'
            break;
        case 'pm25':
            str = 'PM2.5'
            break;
        case 'so2':
            str = 'SO2'
            break;
    }
    return str;
}
