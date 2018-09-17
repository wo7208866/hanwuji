// pages/apply-vip/apply-vip.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    SelectCoupon:"0",//选择优惠券的id
    CouponInfo:"请选择优惠券",//优惠信息
    Info:{},
    Money:0,
    UserImage: wx.getStorageSync("UserImage")//用户头像
  },
  //直接购卡
  Buy:function(){
    console.log(this.data.Info["new"])
    var _this = this;
    if (_this.data.CouponInfo == "请选择优惠券"){
      //优惠券信息
      var coupon = 0 + _this.data.Info["new"]
    }else{
      var coupon = Math.abs(_this.data.CouponInfo) + _this.data.Info["new"]
    }
    if (_this.data.Info["new"] == 0){
      //是新人
      var activate = 1
    }else{
      //新人立减
      var activate = 0
    }
    //总金额 月卡-优惠券-新人立减+押金
    wx.navigateTo({
      url: '../buy-vip/buy-vip?deposite=0&coupon=-' + coupon + '&activate=' + activate + '&money=' + _this.data.Money + '&depositemoney=' + _this.data.Info["deposit"] + "&couponid=" + _this.data.SelectCoupon,
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'PayOrderInfo',
      data: {
        UserId: wx.getStorageSync("UserId"),
      },
      success: data => {
        console.log(data)
        if(data == "failure"){
          //交互失败
          console.log("交互失败")
        }else{
          var money = 1 + data[0]["deposit"] - data[0]["new"];
          _this.setData({
            Info:data[0],
            Money:money.toFixed(2)
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