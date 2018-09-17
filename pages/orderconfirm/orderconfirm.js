// pages/orderconfirm/orderconfirm.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:"",//商品id
    standardId:"",//
    product:{},//产品信息
    address:{}//地址信息
  },

  //跳转地址管理
  Detail:function(){
    wx.navigateTo({
      url: '../select-address/select-address',
    })
  },
  Confirm:function(){
    var _this = this;
    //判断是否有地址
    if(_this.data.address["id"] != ""){
      //下单交互
      ajax.request({
        method: 'GET',
        url: 'NewOrder',
        data: {
          UserId: wx.getStorageSync('UserId'),
          ProductId: _this.data.productId,
          StandardId: _this.data.standardId,
          AddressId: _this.data.address["id"]
        },
        success: data => {
          if (data == "failure") {
            //交互异常
          } else {
            //完成跳转
            wx.navigateTo({
              url: '../orderfinish/orderfinish',
            })
          }
        }
      })
    }else{
      $Toast({
        content: '请添加地址',
        type: 'warning'
      })

    }
    
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      var _this = this;
    _this.setData({
      productId: options.Id,//商品id
      standardId: options.standard,//
    })      
    ajax.request({
      method: 'GET',
      url: 'OrderConfirm',
      data: {
        UserId: wx.getStorageSync('UserId'),
        ProductId:_this.data.productId,
        StandardId:_this.data.standardId
      },
      success: data => {
        if(data == "failure"){
          //交互失败
        }else{
          console.log(data[1])
          _this.setData({
            product: data[0],//产品信息
            address: data[1]//地址信息
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.address);
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