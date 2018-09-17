// pages/select-discount/select-discount.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Coupon:[]
  },

  //选择优惠券
  Select:function(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    var Coupon = e.currentTarget.dataset.id;
    var Info = "-" + e.currentTarget.dataset.info;
    var NewMoney = 499 + prevPage.data.Info["deposit"] - prevPage.data.Info["new"] - e.currentTarget.dataset.info;
    prevPage.setData({
      SelectCoupon: Coupon,
      CouponInfo: Info,
      Money:NewMoney
    })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'SelectCoupon',
      data: {
        UserId: wx.getStorageSync("UserId"),
      },
      success: data => {
        if(data == "failure"){
          //交互异常
        }else{
          console.log(data)
          _this.setData({
            Coupon:data
          })
        }
      }
    })
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