// pages/moneyBox/money.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js'); 
const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Info:{},//钱包信息
    visible:false,//充值弹窗显示flag
    Money:""//充值金额
  },
  Charge:function(){
    this.setData({
      visible: true
    });
  },
  MoneyInput:function(e){
    this.setData({
      Money:e.detail.value
    })
  },
  onCancel: function () {
    this.setData({
      visible: false
    });
  },
  onConfirm: function () {

    var _this = this;
    wx.request({
      url: 'https://www.hgxrshn.com/ChargePay',
      method: 'GET',
      data: {
        UserId: wx.getStorageSync('UserId'),
        Money: _this.data.Money,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data == "failure") {
          // 弹消息框提示支付失败，请再次尝试，如果还是不成功请联系客服人员
          wx.showModal({
            content: '支付失败，请再次尝试，如果一直不成功请联系客服人员',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }
        else {
          wx.requestPayment({
            'appId': "wxfd6235559875c4c3",
            'timeStamp': res.data.timeStamp.toString(),
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': function () {
              // 给后台提交信息提示支付成功,UserId，付款金额，优惠金额
              wx.request({
                url: 'https://www.hgxrshn.com/ChargePayFinish/',
                data: {
                  UserId: wx.getStorageSync('UserId'),
                  Id: res.data.Id,
                  Flag: 1
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {

                  var NewInfo = _this.data.Info;
                  NewInfo['money'] = res["data"][0];
                  _this.setData({
                    Info:NewInfo
                  });
                  // 支付成功
                  $Toast({
                    content: '支付成功',
                    type: 'success'
                  })
                },
                fail: function (res) {
                  console.log(res);
                },
                complete: function (res) {
                  console.log(res);
                }
              })

            },
            'fail': function (res) {
              // 给后台提交信息提示支付失败,UserId，付款金额，优惠金额
              wx.request({
                url: 'https://www.hgxrshn.com/ChargePayFinish/',
                data: {
                  UserId: wx.getStorageSync('UserId'),
                  Id: res["Id"],
                  Flag: 0
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data);
                },
                fail: function (res) {
                  console.log(res);
                },
                complete: function (res) {
                  console.log(res);
                }
              })
              // 取消支付
              $Toast({
                content: '支付未完成',
                type: 'warning'
              })
            }
          })
        }
    _this.setData({
      visible: false
    });
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
      url: 'MyWallet',
      data: {
        UserId: wx.getStorageSync('UserId')
      },
      success: data => {
        if(data == "failure"){
          //failure
        }else{
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