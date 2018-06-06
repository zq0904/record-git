$(function () {
    $('#login').bootstrapValidator({
        feedbackIcons: {//提示图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: { //对应表单name
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'账号有误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    callback:{
                        message:'密码有误'
                    }
                }
            }
        }
    }).on('success.form.bv',function(e){
        //验证通过 阻止表单默认提交事件 发送AJAX
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url:'/employee/employeeLogin',
            type:'POST',
            data:$this.serialize(), //序列化表单 可直接用于ajax
            dataType:'json',
            success: function (data) {
                setTimeout(function(){ //模拟加载

                    if(data.success==true){
                        location.href = './index.html';
                    }else{//登录失败
                        $this.data('bootstrapValidator').disableSubmitButtons(false);//恢复 按钮 可提交
                        //指定某一个表单元素 错误信息 自定义的
                        if(data.error==1000){
                            //账号错误
                            $this.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                        }else if(data.error==1001){
                            //密码错误
                            $this.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                        }
                    }


                },500);
                
            }
        });
    });

    //重置按钮
    $('[type="reset"]').click(function(){
        //需要重置 插件
        $('#login').data('bootstrapValidator').resetForm();
    });




});
