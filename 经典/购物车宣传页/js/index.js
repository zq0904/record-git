$(function(){
    $('#fullpage').fullpage({
        verticalCentered:false,
        sectionsColor:['#F9DD67','#84A2D4','#EF674D','#FFEEDD','#CF4759','#85D9ED','#8AC060','#84D9ED'],
        navigation:true,
        scrollingSpeed:1000,
        // moveTo(section, slide) 滚动到
        afterRender:function(){
            // 页面加载完
            $('.jixu').click(function(){
                $.fn.fullpage.moveSectionDown();//向下滚动
            });
            $('.section').eq(7).on('mousemove',function(e){
                $(this).find('img').eq(3).css({
                    top:e.clientY+20,
                    left:e.clientX+20
                });
            }).find('.btn').hover(function(){
                $(this).children().eq(1).show();
            },function(){
                $(this).children().eq(1).hide();
            }).siblings().eq(0).on('click',function(){
                $.fn.fullpage.moveTo(1);
                $('.selected').removeClass('selected');
                $('.donghua').removeClass('donghua');
                $('.section [style]').removeAttr('style');
            })
        },
        onLeave:function(index,nextIndex,direction){
            // 离开进入下一个页面
            $('.jixu').stop().fadeOut();
            if(index==2 && nextIndex==3){
                $('.section:nth-child(2) .sofa').show().addClass('donghua').on('animationend',function(){
                    $('.section:nth-child(3) .sofa').show();
                    $('.sml img:last-child').show();
                    $('.gou img:last-child').show();
                });
            }else if(index==3 && nextIndex==4){
                $('.section:nth-child(3) .sofa').hide().siblings('img').show().addClass('donghua').on('animationend',function(){
                    $('.section:nth-child(4) .cart .sofa_x').show().parent().addClass('donghua').on('animationend',function(){
                        $('img[src="./images/04-text02.png"]').fadeIn(1000).parent().siblings('.add').fadeIn(1000,function(){
                            $(this).children().fadeIn(1000);
                        });

                    });
                });
            }else if(index==5 && nextIndex==6){
                $('.icbc .sofa').addClass('donghua');
                $('.xiang').addClass('donghua').on('animationend',function(){
                    $('.section:nth-child(6)').addClass('donghua');
                    $('.t1').fadeOut(1000,function(){
                        $(this).siblings('.t2').fadeIn(1000,function(){
                            $(this).siblings('.two').addClass('donghua').on('animationend',function(){
                                $('.section:nth-child(6) .text img:last-child').fadeIn();
                                $('img[src="./images/06-say.png"]').fadeIn(400,function(){
                                    $('.dan img:first-child').fadeIn(1000).siblings().addClass('donghua');
                                });
                            });
                        });
                    })
                });
            }else if(index==6 && nextIndex==7){
                $(".xx img").each(function(i,e){
                    $(this).delay(i*500).fadeIn(500,function(){
                        if(i==4){
                            $('img[src="./images/07-text.png"]').addClass("donghua");
                        }
                    });
                    
                });
            }
        },
        afterLoad:function(anchorLink,index){
            // 进入页面
            $('.jixu').stop().fadeIn();
            $(this).addClass('selected');//进入页面动画

        }

    });
});