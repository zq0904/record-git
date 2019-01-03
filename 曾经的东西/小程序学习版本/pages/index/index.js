//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('首页 加载完成');
    wx.request({
      url: 'https://locally.uieee.com/slides',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => { // 这里使用箭头函数 改变this指向
      console.log(res)
        if (res.statusCode != 200) return;
        // this.data 确实是能够拿到data但是不能更新视图
        // this.setData({ images: res.data});
        // 为了能够正确上线 这里用网上的mock数据 自己组装
        var data = new Array();
        data.push({ id: 1, image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520449578546&di=1f5aad42d90f22b3b0b363e4960acb52&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0dd7912397dda144fa004b20b1b7d0a20cf48612.jpg' });
        data.push({ id: 1, image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520449701170&di=fc5ef589ee945e53fbf46b3e0be06148&imgtype=0&src=http%3A%2F%2Ffiles.jb51.net%2Ffile_images%2Fgame%2F201505%2F201505270858302.jpg' });
        data.push({ id: 1, image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520449483761&di=9ccb511985f00ad9e1f22e64b95c5dd6&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F991539b98083d2ef32a14e502ef654e3c4ef7f71.jpg'});
        data.push({ id: 2, image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520448173136&di=6fb7cf85eef6503b7cb1750305ee3a3f&imgtype=0&src=http%3A%2F%2Fpic.3h3.com%2Fup%2F2016-11%2F20161125163032542640.jpg'});
        this.setData({images: data});
      },
      fail: function(res) {},
      complete: function (res) {},
    });
    wx.request({
      url: 'https://locally.uieee.com/categories',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        if (res.statusCode != 200) return;
        this.setData({
          list: res.data
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('首页 监听页面初次渲染完成');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('首页 显示');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('首页 隐藏');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('首页 监听页面卸载');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
