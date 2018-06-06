//放大镜jquery
$(function(){
    var img_yuan = $('.yuantu');
    var zhedang = $('#zhedang');
    var dakuang = $('#fdj');
    var img_big = $('#img_max');
    $('.img1').hover(function(){
        $('#zhedang').stop().fadeIn();
        $('#fdj').stop().fadeIn();
        $(this).mousemove(function(e){
            var t = Eve.getPageY(e)-img_yuan.offset().top-zhedang.height()/2;
            var l = Eve.getPageX(e)-img_yuan.offset().left-zhedang.width()/2;
            t = t < 0 ? 0 : t;
            l = l < 0 ? 0 : l;
            t = t > img_yuan.height()-zhedang.height() ? img_yuan.height()-zhedang.height() : t;
            l = l > img_yuan.width()-zhedang.width() ? img_yuan.width()-zhedang.width() : l;
            zhedang.css({
                top:t + 'px',
                left:l + 'px'
            });
            //大图反向比例移动
            var t_big = t*(img_big.height()-dakuang.height())/(img_yuan.height()-zhedang.height());
            var l_big = l*(img_big.width()-dakuang.width())/(img_yuan.width()-zhedang.width());
                img_big.css({
                    marginTop: -t_big + 'px',
                    marginLeft: -l_big + 'px'
                });
        });
    },function(){
        $('#zhedang').stop().fadeOut();
        $('#fdj').stop().fadeOut();
    });
    //遮挡层随机颜色
    var time = setInterval(f,1000);
        function f(){
            zhedang.css({backgroundColor:getRgb()});
        }
});



//加入购物车
(function (){
    my$('jia').onclick = function (){
        my$('shuliag').innerHTML++;
    };
    my$('jian').onclick = function () {
        if(my$('shuliag').innerHTML!=0){
            my$('shuliag').innerHTML--;
        }
    };

    my$('gouwushu').onclick = function (){
        my$('gouwu').innerHTML = my$('shuliag').innerHTML;
    };

}());
//简单做5个一起动
(function (){
    var ul = my$('boxul');
    var xk =my$('imgimg');
    var width =xk.offsetWidth;
    var i = 0;
    var key = true; //锁死
    my$('right').onclick = function (){
        if(!key)return;
        key = false;
          if(i==2){
              i=0;
              ul.style.marginLeft = 0;
          }
        i++;
        my_animate(ul,{marginLeft:-i*width},function(){key=true});
    };
    my$('left').onclick = function (){
        if(!key)return;
        key = false;
        if(i==0){
            i=2;
            ul.style.marginLeft = -i*width + 'px';
        }
        i--;
        my_animate(ul,{marginLeft:-i*width},function(){key=true});
    };
}());

//背景反向
$(function(){
    var mt = parseInt($('#bgvid').css('marginTop'));//初始位置 (太坑了 初始就要获取 千万不要写在mousemove)
    var ml = parseInt($('#bgvid').css('marginLeft'));
    $('html').mousemove(function(e){
        var chushi_h = $('html').height()/2; //定中心初始位置 也是最大移动距离
        var chushi_w = $('html').width()/2;
        
        var t = Eve.getPageY(e) - chushi_h;  //相对中心移动位置
        var l = Eve.getPageX(e) - chushi_w;
        
        var t_img = -t*(400/$('html').height()); //bg的相对偏移
        var l_img = -l*(400/$('html').width()); 
        $('#bgvid').css({
            marginTop: mt + t_img,
            marginLeft: ml + l_img
        });

    });
});

//鼠标 垂直范围 $('html').height()

//0     -400  垂直范围
//-200   200  水平范围



// 点击 播放 视频
// dom对象.paly()播放 autoplay不好使
$(function(){
    $('.sp').click(function(){
        $('#shipin').prop({
            src:"./1800016839/FATE.mp4"
        }).stop().fadeIn(1350,function(){
            $('#shipin')[0].play();
        });
        $('#close_shipin').stop().fadeIn(1350);
        
        $('.close_r').stop().slideUp(1350);// close_r 右框隐藏

    });

});
// 点击 视频 暂停
$(function(){
    var i = 1;
    $('#shipin').click(function(){
        i++;
        if(i%2==0){
            $('#shipin')[0].pause();
        }else{
            $('#shipin')[0].play();
        }
        
    });
});


// 关闭 视频
$(function(){
    $('#shipin')[0].onended = function(){//播完关闭
        $('#close_shipin').stop().fadeOut();
        f();

    }; 
    $('#close_shipin').click(f); 
    function f(){
        $('#shipin').stop().fadeOut()
        .prop({src:""});//清空视频 保证下次重头播放 反正我是没找到让视频重头播放的方法
        $('#close_shipin').stop().fadeOut();//隐藏按钮
        $('.close_r').stop().slideDown(1350);//显示 右框
    }
});
//干掉背景视频的声音
$(function(){
    $('#bgvid')[0].volume = 0;
});


//切换背景
$(function(){
    var i = 1;
    $('.gh_bj').click(function(){
        i++;
        $('#bgvid').prop({
            src:(i%2==0?'./1800016839/吾王无剑光版动态壁纸-丅雪_x264.mp4':'./1800016839/FateApocrypha-动态壁纸.mp4')
        })
    });
});


//X 随机颜色
$(function(){
    setInterval(function(){
        var c = getRgb();
        $('#close_shipin').css({
            color: c,
            borderColor: c
        });
    },2000);
    
});

// 音乐 单机 暂停/播放切换  双击重置
$(function(){
    var x = 1;
    $('.bg_yin').click(function(){
        x++;
        if(x%2==0){
            $('#bgm')[0].play();
        }else{
            $('#bgm')[0].pause();
        }
        

    });

    $('.bg_yin').dblclick(function(){
        $('#bgm').prop({//只能给父容器设置src
            src:'',
            src:'./1800016839/Eliana_ing.mp3'
        });
    });

});










// JQuery里 获取 e.pageY 怎么获取
//          获取 除了 height width  的 只能通过 css() ?? 带单位 太恶心



