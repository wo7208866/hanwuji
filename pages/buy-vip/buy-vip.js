// pages/buy-vip/buy-vip.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Deposit:"",//押金金额
    DepositFlag:"未免押",//是否免押
    Coupon:"0",//优惠信息
    CouponId:"",//使用优惠券的id
    Activate:true,//新人立享
    Money:"", //总金额
    Check:false, //是否同意用户协议
    tip:false //弹出层显示控制器
  },
  //是否同意用户协议
  Agree:function(){
    this.setData({
      Check:!this.data.Check
    })
    console.log(this.data.Check)
  },
  //下单支付
  Pay:function(){
    var _this = this;
    console.log(this.data.Check)
    if(_this.data.Check == false){
      //没有同意用户协议
      _this.setData({
        tip:true
      })
    }else{
      //下单支付
      console.log("下单成功")
      _this.Payment()
    }
  },
  //关闭提示层
  TipCancel: function () {
    this.setData({
      tip: false
    });
  },
  // 支付
  Payment: function () {
    var _this = this;
    wx.request({
      url: 'https://www.hgxrshn.com/pay',
      method: 'GET',
      data: {
        UserId: wx.getStorageSync('UserId'),
        Coupon: _this.data.Coupon,
        Money: _this.data.Money,
        CouponId: _this.data.CouponId
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
                url: 'https://www.hgxrshn.com/payfinish/',
                data: {
                  UserId: wx.getStorageSync('UserId'),
                  Id: res.data.Id,
                  Flag:1
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorage({
                    key: "Vip",
                    data: 1
                  })
                },
                fail: function (res) {
                  console.log(res);
                },
                complete: function (res) {
                  console.log(res);
                }
              })
              //支付成功，页面跳转
              wx.switchTab({
                url: '../cart/cart',
              })
            },
            'fail': function (res) {
              // 给后台提交信息提示支付失败,UserId，付款金额，优惠金额
              wx.request({
                url: 'https://www.hgxrshn.com/payfinish/',
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
      },
      fail: function (err) {
        console.log(err)
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //数据初始化
    this.setData({
      Deposit: options.depositemoney,
      DepositFlag:options.deposite == 0 ? "未免押":"已免押",
      Coupon:options.coupon,
      Activate:options.activate == 1 ? true:false,
      Money:options.money,
      CouponId: options.couponid
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