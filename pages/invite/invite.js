// pages/invite/invite.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Code:"1111111",//邀请码
    InviteCode:"",//邀请人邀请码
    Process:0//邀请进度
  },
  //邀请码输入
  CodeInput:function(e){
    this.setData({
      InviteCode:e.detail.value
    })
  },
  Submit:function(){
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'InviteSubmit',
      data: {
        UserId: wx.getStorageSync('UserId'),
        Invite:_this.data.InviteCode
      },
      success: data => {
        if(data == "failure"){
          //交互失败
          wx.showToast({
            title: '邀请码有误',
            icon: 'success',
            duration: 1000
          })          
        }else{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          _this.setData({
            Process: data[0]
          })
        }
      }
    })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'InviteInfo',
      data: {
        UserId: wx.getStorageSync('UserId')
      },
      success: data => {
        if(data == "failure"){
          //交互失败
        }else{
         /* _this.setData({
            Code:data[0],
            Process:data[1]
          })
          */
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