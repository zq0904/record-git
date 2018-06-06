$(function(){
    //初始化echarts实例  dom元素
    var myChart1 = echarts.init($('.con .l')[0]);
    //配置项和数据
    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3500, 1500, 1200, 2200]
        }]
    };
    //渲染图表
    myChart1.setOption(option1);

    var myChart2 = echarts.init($('.con .r')[0]);
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','李宁','特步','阿迪达斯','海澜之家']
        },
        series : [
            {
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'李宁'},
                    {value:234, name:'特步'},
                    {value:135, name:'阿迪达斯'},
                    {value:1548, name:'海澜之家'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);



});
