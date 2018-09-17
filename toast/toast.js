var interval = null;

Component({

  properties: {

    modalHidden: {

      type: Boolean,

      value: false

    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden

    modalMsg: {

      type: String,

      value: ''


    }

  },

  data: {

    // 这里是一些组件内部数据

    text: "text",
    time: "获取验证码",
    Info: { phone: wx.getStorageSync('UserPhone') },//信息
    Code: "",//验证码
    currentTime: 61,
    num: ['', '', '', '']
  },

  methods: {

    Message: function (e) {
      var num = e.detail.value.split('');
      this.setData({
        num: num
      })
      this.setData({
        Message: e.detail.value
      })
    },
    //加载
    Submit: function () {

      var _this = this;
      if (_this.data.time == "获取验证码" || _this.data.time == "重新发送") {
        //验证电话
        if (_this.data.Info["phone"] != "") {
          //验证通过
          var _this = this;
          wx.request({
            method: 'GET',
            url: "https://www.hgxrshn.com/SendMessage",
            headers: {
              'Content-Type': 'application/json;charset=UTF-8;'
            },
            data: {
              UserId: wx.getStorageSync('UserId'),
              Phone: wx.getStorageSync('UserPhone')
            },
            success: data => {
              if (data == "failure") {
                //出现异常
                console.log(1)
              } else {
                console.log(data)
                _this.setData({
                  Code: data["data"]
                })
                _this.getCode();
              }
            }
          })
        }
      }

    },
    //改变发送验证码状态
    getCode: function () {
      var that = this;
      var currentTime = that.data.currentTime
      interval = setInterval(function () {
        currentTime--;
        that.setData({
          time: currentTime + '秒'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '重新发送',
            currentTime: 61,
            disabled: false
          })
        }
      }, 1000)
    },

    // 这里放置自定义方法

    clickHidden: function () {
      console.log(1)
      this.setData({

        modalHidden: true,

      })

    },

    // 确定

    next: function () {
      var _this = this;
      console.log(_this.data.Message)
      console.log(_this.data.Code)
      if (_this.data.Message == _this.data.Code && _this.data.Code != "") {
        //验证码正确
        _this.setData({

          modalHidden: true,

        })
        var status = true;
        _this.triggerEvent('phoneOk', status);
      } else {

        //验证失败
        //提示验证失败
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
          duration: 1500
        })
      }


    }

  }

})
