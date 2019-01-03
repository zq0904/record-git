$(function(){
    // 默认渲染页面
    window.currPage = 1;
    var render = function (){
        getData({
            page:currPage,
            pageSize:2
        },function(data){
            //渲染表格
            $('tbody').html(template('tbody',data));
            //渲染分页角标
            setPage(currPage,Math.ceil(data.total/2),render); //结构巧妙！！！
        });
    };
    render();
    //添加二级分类 需要 categoryId所属分类id brandName品牌名称 brandLogo品牌logo图片地址
    // 添加分类中  的一级分类列表
   $.ajax({
        url:'/category/queryTopCategoryPaging', //查询一级分类接口
        type:'GET',
        data:{
            page:1, //查全 所以从1开始
            pageSize:1000 //目的仅仅是能够显示全
        },
        dataType:'json',
        success:function(data){
            if(data.error){ //没登录
                location.href = './login.html';
            }else{
                $('.dropdown-menu').html(template('list',data)) //渲染
                .on('click','a',function(){
                    $('.dropdown-toggle').html( $(this).html() ); //显示值
                    $('#hidden1').val( $(this).attr('data-id') ); //设置id 隐藏域
                })

            }
        }
    });
   // 上传图片
    $('#fileupload').fileupload({
        url:'/category/addSecondCategoryPic', //上传接口
        dataType: 'json',
        done: function (e, data) {
            //文件路径 data.result.picAddr
            $('.img img').prop({ //显示图片
                src:data.result.picAddr
            });
            $('#hidden2').val(data.result.picAddr); //设置图片 隐藏域
        }
    });
    // 验证插件验证
    $('#form').bootstrapValidator({
        excluded:[], //验证插件 默认不去验证隐藏的元素 此时需要释放限权
        feedbackIcons: {//提示图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: { //对应表单name
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传二级分类Logo'
                    }
                }
            }
        }
    }).on('success.form.bv',function(e){
        e.preventDefault();//验证通过 阻止表单默认提交事件 发送AJAX
        console.log(1);
    });
    




});

//查询2级分类数据
var getData = function (o,fn) {
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'GET',
        data:o,
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.error){ //如果用户登录了返回的data是数据 没登录返回error
                location.href = './login.html';
            }else{
                fn && fn(data);
            }
        }
    });
}
//分页角标渲染
var setPage = function (currPage,sumPage,callback){
    $('.pagination').bootstrapPaginator({
        bootstrapMajorVersion:3, //版本1用div 3用ul
        size:'small',       //配置字体大小 小号
        currentPage:currPage,    //当前页数
        totalPages:sumPage,      //一共多少页
        //点击分页角标触发事件 ！！！
        onPageClicked:function (event,originalEvent,type,page){
            window.currPage = page; //吧点击的那个 设置为当前页
            callback && callback();
        }
    });
};
