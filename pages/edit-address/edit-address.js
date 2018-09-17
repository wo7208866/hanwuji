// pages/edit-address/edit-address.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['西安', '宝鸡', '北京'],
    info: { "default": false }//地址信息保存
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })    
  },
  PersonInput: function (e) {
    var New = this.data.info
    New["name"] = e.detail.value
    this.setData({
      info: New
    })
  },
  PhoneInput: function (e) {
    var New = this.data.info
    New["phone"] = e.detail.value
    this.setData({
      info: New
    })
  },
  AddressInput: function (e) {
    var New = this.data.info
    New["address"] = e.detail.value
    this.setData({
      info: New
    })
  },
  DefaultFlag: function () {
    var New = this.data.info
    New["default"] = !this.data.info["default"]
    this.setData({
      info: New
    })
  },
  Save: function () {
    
    var _this = this;

    var Address = _this.data.info;
    Address["city"] = _this.data.index;
    Address["address"] = _this.data.array[_this.data.index] + _this.data.info["address"]
    ajax.request({
      method: 'GET',
      url: 'EditAddress',
      data: {
        UserId: wx.getStorageSync("UserId"),
        Id: _this.data.Id,
        Info: Address
      },
      success: data => {
        if (data == "failure") {
          //交互失败
        } else {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          })
          wx.navigateTo({
            url: '../adress/adress',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    var New = _this.data.info;
    var address = options.address.split(_this.data.array[options.index])[1]
    New["name"] = options.name
    New["phone"] = options.phone
    New["address"] = address
    if(options.default == "false"){
      New["default"] = false
    }else{
      New["default"] = true
    }
    _this.setData({
      info:New,
      index:options.index,
      Id:options.id
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