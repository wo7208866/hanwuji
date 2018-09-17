// pages/return/return.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['西安', '宝鸡', '北京'],
    tipShow:false,
    indexShow:true,
    product:{},//商品信息
    Order:"",//订单id
    DeliveryNo:"", //物流单号
    DeliveryNoCheck:"" //物流单号确认
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //提交归还
  submitReturn:function(){
    var _this = this;
    //两次输入订单号不一致
    if(_this.data.DeliveryNo != _this.data.DeliveryNoCheck && _this.data.DeliveryNo != ""){
      //提示订单号异常
      wx.showToast({
        title: '订单号有误',
        icon: 'success',
        duration: 1500
      })
    }else{
      //还衣交互
      ajax.request({
        method: 'GET',
        url: 'OrderReturn',
        data: {
          Id: _this.data.Order,
          Company:_this.data.array[_this.data.index],
          No:_this.data.DeliveryNo
        },
        success: data => { 
          if(data == "failure"){
            //交互异常
          }else{
            this.setData({
              tipShow: true,
              indexShow: false
            })
          }
        }
      })      
    }
  },
  forIndex:function(){
    console.log(1)
    wx.reLaunch({
      url: '../main/main',
    })
  },
  //物流单号输入
  DeliveryNo:function(e){
    var _this = this;
    _this.setData({
      DeliveryNo:e.detail.value
    })
  },
  DeliveryNoCheck: function (e) {
    var _this = this;
    _this.setData({
      DeliveryNoCheck: e.detail.value
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var OrderId = options.Id
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'OrderDetail',
      data: {
        Id: OrderId,
      },
      success: data => { 
        if(data == "failure"){
          //交互失败
        }else{
          _this.setData({
            product:data[0],
            Order: OrderId
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