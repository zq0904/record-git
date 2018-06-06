$(function(){
    //主列表
    $('.list>li a').on('click',function(){
        console.log(1);
        if($(this).parent().hasClass('s')){
           $(this).parent().next().slideToggle();
        }else{
           $(this).parent().addClass('now').siblings('li').removeClass('now');
        }
    });
    //子列表
    $('.list>div a').on('click',function(){
        $(this).addClass('now').siblings().removeClass('now').parent().prev().addClass('now').siblings().removeClass('now')
    });
    //top 侧栏显示
    var i = 0;
    $('.top a').eq(0).on('click',function(){
        i++;
        $('.index .l').stop().animate({
            'margin-left':i%2==0?'0px':'-180px' //侧栏显示
        },400)
    });
    //公有模态框 在JS中的追加  /*把html格式的字符串转出  js字符串拼接  数字拼接  http://www.css88.com/tool/html2js/*/
    var text =["<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">",
        "                    <div class=\"modal-dialog modal-sm\">",
        "                    <div class=\"modal-content\">",
        "                    <div class=\"modal-header\">",
        "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>",
        "                <h4 class=\"modal-title\" id=\"myModalLabel\">温馨提示</h4>",
        "                    </div>",
        "                    <div class=\"modal-body text-danger\">",
        "                    <span class=\"glyphicon glyphicon-info-sign\"></span>您确定要退出后台管理系统吗？",
        "                </div>",
        "                <div class=\"modal-footer\">",
        "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>",
        "                    <button type=\"button\" id=\"queding\" class=\"btn btn-primary\">确定</button>",
        "                    </div>",
        "                    </div>",
        "                    </div>",
        "                    </div>"].join("");
    $(document.body).append(text);
    //模态框退出登录 确定  AJAX成功确认了 重定向 到login
    $('#queding').on('click',function(){
        $.ajax({
            url:'/employee/employeeLogout',
            type:'GET',
            data:'',
            dataType:'json',
            success:function(data){
                setTimeout(function(){ //模拟加载
                    if(data.success==true){
                        $('#myModal').modal('hide');
                        location.href = './login.html';
                    }
                },500);
            }
        });
    });
    //ajax请求 进度条插件
    NProgress.configure({ showSpinner: false });//禁用进度环
    $(window).ajaxStart(function(){
        NProgress.start(); // 显示进度条
    }).ajaxComplete(function(){
        NProgress.done(); //完成进度条
    });


});


















