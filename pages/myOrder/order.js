// pages/myOrder/order.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navonOff:[true,false,false,false,false],
    Info1:[],//待收货
    Info2:[],//待归还
    Info3:[],//已完成
    Info4:[],//全部订单
    visible:false,
    visible2: false,
    SelectId:"", //选择操作的订单Id
    TabIndex:"" //选项卡index
  },
  tabhandChange:function(event){
      var Index = event.currentTarget.dataset.index;
      var newOff = [false, false, false, false, false];
    newOff[Index] = true;
      this.setData({
        navonOff: newOff
      })

  },
  //查看订单详情
  OrderDetail:function(e){
    wx.navigateTo({
      url: '../look-order/look-order?Id=' + e.currentTarget.dataset.id,
    })
  },
  //取消订单
  HurryUp: function (e) {
    this.setData({
      visible2: true,
      SelectId: e.currentTarget.dataset.id
    })
  },
  BuyAgain:function(e){
    //跳转至订单确认页面

    wx.navigateTo({
      url: '../orderconfirm/orderconfirm?Id=' + e.currentTarget.dataset.product + "&standard=" + e.currentTarget.dataset.standard,
    }) 
  },
  //取消订单
  CloseOrder:function(e){
    this.setData({
      visible:true,
      SelectId: e.currentTarget.dataset.id
    })
  },
  //查看物流
  Send:function(e){
    wx.navigateTo({
      url: '../mail/mail?Id=' + e.currentTarget.dataset.id + "&Type=send",
    }) 
  },
  Return: function (e) {
    wx.navigateTo({
      url: '../mail/mail?Id=' + e.currentTarget.dataset.id + "&Type=return",
    })
  },
  //弹窗 放弃按钮
  onCancel:function(){
    this.setData({
      visible: false,
      visible2:false
    })    
  },
  //弹窗 确定取消按钮
  onConfirm:function(){
    var _this = this;
    //关闭弹窗
    _this.setData({
      visible: false
    })
    //交互取消订单
    ajax.request({
      method: 'GET',
      url: 'CloseOrder',
      data: {
        Id: _this.data.SelectId,
      },
      success: data => { 
        if(data == "failure"){
          //交互异常
        }else{
          _this.onLoad({index:_this.data.TabIndex});
        } 
      }
    })      
  },
  //订单归还
  OrderReturn:function(e){
    if(e.currentTarget.dataset.type == 0){
      //预约归还
      wx.navigateTo({
        url: '../return/return?Id=' + e.currentTarget.dataset.id,
      }) 
    }else{
      $Toast({
        content: '订单已经预约',
        type: 'warning'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'MyOrders',
      data: {
        UserId: wx.getStorageSync('UserId'),
      },
      success: data => {
        if(data == "failure"){
          //交互失败
        }else{
          _this.setData({
            Info1:data[0],
            Info2: data[1],
            Info3: data[2],
            Info4: data[3],
          })
        }
      }
    })
    var Index = option.index;
    var newOff = [false, false, false, false, false];
    newOff[Index] = true;
    this.setData({
      navonOff: newOff,
      TabIndex:Index
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