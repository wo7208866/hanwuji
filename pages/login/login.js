// pages/login/login.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

var interval = null //倒计时函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Phone:"",
    Message:"",
    Code:"",
    time:"获取验证码",
    currentTime: 61
  },
  UserPhone:function(e){
    this.setData({
      Phone:e.detail.value
    })
  },
  Message: function (e) {
    this.setData({
      Message: e.detail.value
    })
  },  
  SendMessage:function(e){
    
    var _this = this;
    if (_this.data.time == "获取验证码" || _this.data.time == "重新发送"){
      //验证电话
      if (_this.CheckPhone()) {
        //验证通过
        var _this = this;
        ajax.request({
          method: 'GET',
          url: 'SendMessage',
          data: {
            UserId: wx.getStorageSync('UserId'),
            Phone: _this.data.Phone
          },
          success: data => {
            if (data == "failure") {
              //出现异常
            } else {
              console.log(data)
              _this.setData({
                Code: data
              })
              _this.getCode();
            }
          }
        })
      }
    }

  },
  //改变发送验证码状态
  getCode: function () {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  //检查手机号
  CheckPhone:function(){

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.data.Phone.length == 0) {
      wx.showToast({
        title: '手机号为空',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (this.data.Phone.length < 11) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(this.data.Phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else {
      return true;
    }
  },
  //登陆函数
  Login:function(){
    var _this = this;
    if (_this.data.Message == _this.data.Code && _this.data.Code != ""){
      //验证码正确
      ajax.request({
        method: 'GET',
        url: 'Login',
        data: {
          UserId: wx.getStorageSync('UserId'),
          Phone: _this.data.Phone
        },
        success: data => {
          if(data == "failure"){

          }else{
            //登陆成功，改变登陆状态
            wx.setStorage({
              key: 'Sign',
              data: 1
            })
            wx.switchTab({
              url: '../cart/cart',
            })   
          }
        }
      })
    }else{
      //验证失败
      //提示验证失败
      wx.showToast({
        title: '验证码错误',
        icon: 'failure',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    
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