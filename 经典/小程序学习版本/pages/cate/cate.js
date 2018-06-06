//cate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        pageType: '', // 请求的页面类型 是 美食啊还是足疗啊什么的
        page: 1, // 当前请求的页码
        limit: 20, // 数据条数
        totalCount: 1000, // 数据最多有多少
        toggle: true // loading切换
    },
    // 这个页面封装的请求
    request: function () {
        if (this.data.totalCount <= this.data.list.length) {
            this.setData({toggle: false});
            return false;
        }
        wx.request({
            url: 'https://locally.uieee.com/categories/' + this.data.pageType + '/shops', // 组件之间的传参是通过查询字符串来获取
            data: {
                _page: this.data.page, // 页码
                _limit: this.data.limit // 数据条数
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: res => {
                this.data.totalCount = res.header['X-Total-Count'] - 0; // 数据最多有多少
                if (res.statusCode != 200) return;
                this.setData({
                    list: this.data.list.concat(res.data)
                });
            },
            fail: function (res) { },
            complete: function (res) { },
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log('美食 加载完成');
        wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画
        wx.setNavigationBarTitle({
            title: options.title || '小程序' // 直链进来'小程序'
        });
        this.setData({ // 设置请求的页面类型
            pageType: options.id
        });
        this.request();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('美食 监听页面初次渲染完成');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log('美食 显示');
        wx.hideNavigationBarLoading(); // 隐藏导航条加载动画
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log('美食 隐藏');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log('美食 监听页面卸载');
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // console.log('监听用户下拉动作');
        // 下拉刷新
        this.setData({ // 重置
            list: [],
            page: 1,
            toggle: true
        });
        this.request();
        wx.stopPullDownRefresh(); // 停止当前页面下拉刷新(加载完数据 手机上 必须停止)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 上拉加载
        this.data.page ++
        this.request();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        
    }
})
