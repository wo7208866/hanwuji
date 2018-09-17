// pages/mine/mine.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserImage: wx.getStorageSync("UserImage"),
    UserName: wx.getStorageSync("UserName"),
    current: '',
    Time:"2018-09-01",
    Count:"",
    isVip:false,
    isUsuall:true,
    modalHiddenoff: true,
    phoneHiddenoff: true
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    wx.navigateTo({
      url: '../orders/orders?kind=' + detail.key
    })
  },
  myOrder:function(event){
    var Index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../myOrder/order?index='+Index
    })
  },
  phoneChangeNum:function(){
    if (wx.getStorageSync("Sign") == "0"){
      //用户未注册
      wx.navigateTo({
        url: '../login/login'
      })      
    }else{
      //已注册用户修改手机号
      this.setData({
        modalHiddenoff: false
      })
    }

  },
  phoneChange(event) {
    if (event.detail == true) {
      this.setData({
        phoneHiddenoff: false
      })
    }
    console.log(this.data.phoneHiddenoff)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var _this = this;
    if (wx.getStorageSync("Vip") == 0){
      //不是vip
      _this.setData({
        isVip: false,
        isUsuall: true        
      })
    }else{
      _this.setData({
        isVip: true,
        isUsuall: false
      })      
    }
    ajax.request({
      method: 'GET',
      url: 'Personal',
      data: {
        UserId: wx.getStorageSync('UserId'),
      },
      success: data => {
        _this.setData({
          Time:data[0],
          Count:data[1]
        })
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
    this.onLoad();
  },
  phoneChange(event) {
    if (event.detail == true) {
      this.setData({
        phoneHiddenoff: false
      })
    }
    console.log(this.data.phoneHiddenoff)
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
    this.onLoad();
    wx.stopPullDownRefresh();
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