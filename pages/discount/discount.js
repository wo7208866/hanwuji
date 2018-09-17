// pages/discount/discount.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     dicountKind:[true,false,false],
    Coupon1: [],//可用优惠券
    Coupon2: []//过期优惠券
  },
  tabhandChange:function(event){
    var Index = event.currentTarget.dataset.index;
    var newOff = [false, false, false];
    newOff[Index] = true;
    this.setData({
      dicountKind: newOff
    })
  },
  //去使用优惠券，跳转至开通月卡页面
  ToUse:function(){
    wx.navigateTo({
      url: '../apply-vip/apply-vip',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'MyCoupons',
      data: {
        UserId: wx.getStorageSync("UserId"),
      },
      success: data => {
        if(data == "failure"){
          //交互失败
        }else{
          _this.setData({
            Coupon1:data[0],
            Coupon2:data[1]
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