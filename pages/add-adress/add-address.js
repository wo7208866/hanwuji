// pages/add-adress/add-address.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['西安', '宝鸡', '北京'],
    info:{"default":false}//地址信息保存
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  PersonInput:function(e){
    var New = this.data.info
    New["name"] = e.detail.value
    this.setData({
      info:New
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
    New["info"] = e.detail.value
    this.setData({
      info: New
    })
  },
  DefaultFlag: function (e) {
    console.log(e.detail.value);
    var New = this.data.info
    if(e.detail.value){
      New["default"] = !this.data.info["default"]
      this.setData({
        info: New
      })
    }
  },
  Save:function(){
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var pre_three = pages[pages.length - 3];
    var _this = this;
    var Address = _this.data.info;
    Address["city"] = _this.data.index;
    Address["address"] = _this.data.array[_this.data.index] + _this.data.info["address"]
    console.log(Address)
     if(_this.data.info["name"]==undefined) {
      wx.showToast({
        title: '请输入联系人姓名',
        duration: 1500
      })
     } else if (_this.data.info["phone"] == undefined) {
       wx.showToast({
         title: '请输入电话号码',
         duration: 1500
       })
     } else if (isNaN(_this.data.info["phone"]) == true) {
      wx.showToast({
        title: '电话号码格式不正确',
        duration: 1500
      })
     } else if (_this.data.info["info"] == undefined) {
       wx.showToast({
         title: '请输入详细地址',
         duration: 1500
       })
     }else{
    ajax.request({
      method: 'GET',
      url: 'NewAddress',
      data: {
        UserId: wx.getStorageSync("UserId"),
        Info: Address
      },
      success: data => {
        if (data == "failure") {
          //交互失败
        } else {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 1500
          })
          pre_three.setData({
            address:Address
          })
          wx.navigateBack({
            delta: 1
          })
          pre_page.onLoad();
          
        }
      }
    }) 
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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