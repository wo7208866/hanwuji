// pages/coupons/coupons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    OrderInfo: [1, 2, 3],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    CouponInfo: [
      {
        imgUrls: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        Condition: "花花公子",
        Name: "蓝黑格修身西服套装",
        Period: "180/54A",
        price: "999",
        count: 10,
        isSelect: false,
        Kind: 1
      },
      {
        imgUrls: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        Condition: "花花公子",
        Name: "蓝黑格修身西服套装",
        Period: "180/54A",
        price: "999",
        count: 10,
        isSelect: false,
        Kind: 1
      },
      {
        imgUrls: "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg",
        Condition: "花花公子",
        Name: "蓝黑格修身西服套装",
        Period: "180/54A",
        price: "999",
        count: 10,
        isSelect: false,
        Kind: 1
      }
    ], //数据
  },
  handleChange({ detail }) {
    this.setData({
      currentTab: detail.key
    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var _this = this;
    _this.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var _this = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    /** 
      * 获取系统信息 
    */
    wx.getSystemInfo({

      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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