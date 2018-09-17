// pages/personalFile/personal.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
        Info:{},//用户数据
        date:'2018-09-09',
        index:0,
        downClose:['170','180','100'],//西裤
        upClose: ['170', '180', '100'],//上衣
        jobClose: ['170', '180', '100'],//职业
        skinClose: ['170', '180', '100'],//肤色
        sceneClose: ['170', '180', '100'],//场景
  },

  HeightInput:function(e){
    var New = this.data.Info
    New["height"] = e.detail.value
    this.setData({
      Info:New
    })
  },

  upPicker: function (e) {
    var newInfo = this.data.Info
    var arrayIndex = e.detail.value
    newInfo['top'] = this.data.upClose[arrayIndex]
    this.setData({
      Info: newInfo
    })
  },
  downPicker:function(e){
   var newInfo = this.data.Info
    var arrayIndex = e.detail.value
    newInfo['pants'] = this.data.downClose[arrayIndex]
    this.setData({
      Info: newInfo
    })
  },
  jobPicker: function (e) {
    var newInfo = this.data.Info
    var arrayIndex = e.detail.value
    newInfo['job'] = this.data.jobClose[arrayIndex]
    this.setData({
      Info: newInfo
    })
  },
  skinPicker: function (e) {
    var newInfo = this.data.Info
    var arrayIndex = e.detail.value
    newInfo['color'] = this.data.skinClose[arrayIndex]
    this.setData({
      Info: newInfo
    })
  },
  scenePicker: function (e) {
    var newInfo = this.data.Info
    var arrayIndex = e.detail.value
    newInfo['scene'] = this.data.sceneClose[arrayIndex]
    this.setData({
      Info: newInfo
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var newInfo = this.data.Info
    newInfo['born'] = e.detail.value
    this.setData({
      Info: newInfo
    })
  },
  WeightInput: function (e) {
    var New = this.data.Info
    New["weight"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  TopInput: function (e) {
    var New = this.data.Info
    New["top"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  PantsInput: function (e) {
    var New = this.data.Info
    New["pants"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  BornInput: function (e) {
    var New = this.data.Info
    New["born"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  JobInput: function (e) {
    var New = this.data.Info
    New["job"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  ColorInput: function (e) {
    var New = this.data.Info
    New["color"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  SceneInput: function (e) {
    var New = this.data.Info
    New["scene"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  RemarkInput: function (e) {
    var New = this.data.Info
    New["remark"] = e.detail.value
    this.setData({
      Info: New
    })
  },
  Save:function(){
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'PersonalInfoSave',
      data: {
        UserId: wx.getStorageSync("UserId"),
        Info:_this.data.Info
      },
      success: data => {
        if (data == "failure") {
          //交互异常
        } else {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
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
      url: 'PersonalInfo',
      data: {
        UserId: wx.getStorageSync("UserId"),
      },
      success: data => {
        if(data == "failure"){
          //交互异常
        }else{
          console.log(data)
          _this.setData({
            Info:data[0]
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