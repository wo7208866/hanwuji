//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.hgxrshn.com/onLogin',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.setStorage({
                key: 'UserId',
                data: res.data[0]
              })
              wx.setStorage({
                key: 'Sign',
                data: res.data[1]              
              })
              wx.setStorage({
                key: "Vip",
                data: res.data[2]
              })
              wx.setStorage({
                key: "OrderIng",
                data: res.data[3]
              })
              wx.setStorage({
                key: "UserPhone",
                data: res.data[4]
              })              
            },
            fail: function (res) {
            },
            complete: function (res) {
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    //在线字体
    wx.loadFontFace({
      family: 'myfont',
      source: 'url("//at.alicdn.com/t/webfont_hpan039xv08.ttf")',
      success: function (res) {
        console.log(res.status) //  loaded
      },
      fail: function (res) {
        console.log(res.status) //  error
      },
      complete: function (res) {
        console.log(res.status);
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorage({
                key: "UserName",
                data: res.userInfo.nickName
              })
              wx.setStorage({
                key: "UserImage",
                data: res.userInfo.avatarUrl
              })                
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.navigateTo({
            url: '../Auth/Auth'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})