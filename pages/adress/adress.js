// pages/adress/adress.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1:true,
    show2:false,
    address:[]//地址数据
  },
  AddAddress:function(){
    wx.navigateTo({
      url: '../add-adress/add-address',
    })
  },
  ChangeDefault:function(e){
    var _this = this;
    var address = e.currentTarget.dataset.id
    ajax.request({
      method: 'GET',
      url: 'DefaultAddress',
      data: {
        UserId: wx.getStorageSync("UserId"),
        Id: address
      },
      success: data => {
        if (data == "failure") {
          //交互异常
        }else{
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },
  DelAddress:function(e){
    var _this = this;
    var address = e.currentTarget.dataset.id
    ajax.request({
      method: 'GET',
      url: 'DelAddress',
      data: {
        Id: address
      },
      success: data => {
        if (data == "failure") {
          //交互异常
        } else {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
          _this.onLoad()
        }
      }
    })
  },
  EditAddress:function(e){
    var _this = this;
    for(var i=0;i < _this.data.address.length;i++){
      if (_this.data.address[i]["id"] == e.currentTarget.dataset.id){
          var Select = _this.data.address[i]
          
        wx.navigateTo({
          url: '../edit-address/edit-address?name=' + Select["name"] + "&phone=" + Select["phone"] + "&address=" + Select["info"] + "&default=" + Select["default"] + "&index=" + Select["city"] + "&id=" + Select["id"],
        })
          break
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'AddressInfo',
      data: {
        UserId: wx.getStorageSync("UserId"),
      },
      success: data => { 
        console.log(data)
        if(data == "failure"){
          //交互失败
        }else{
          if(data[1] == 0){
            //没有地址
            _this.setData({
              address: data[0],
              show1:true,
              show2:false
            })            
          }else{
            _this.setData({
              address: data[0],
              show1: false,
              show2: true
            })
          }
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