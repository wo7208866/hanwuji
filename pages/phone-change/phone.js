var interval = null;

Component({

  properties: {

    phoneHidden: {

      type: Boolean,

      value: false

    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden

    modalMsg: {

      type: String,

      value: ' ',

    }

  },

  data: {

    // 这里是一些组件内部数据

    text: "text",
    phone:"",//新电话号码
    time:"获取验证码",
    Code: "",//验证码
    currentTime: 61,
    Message:""//输入验证码
  },

  methods: {
    NewPhone:function(e){
      this.setData({
        phone: e.detail.value
      })
    },
    Message: function (e) {
      this.setData({
        Message: e.detail.value
      })
    },
    //加载
    Submit: function () {

      var _this = this;
      if (_this.data.time == "获取验证码" || _this.data.time == "重新发送") {
        //验证电话
        if (_this.data.phone != "") {
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
              Phone: _this.data.phone
            },
            success: data => {
              if (data == "failure") {
                //出现异常
              } else {
                console.log(data)
                _this.setData({
                  Code: data["data"]
                })
                _this.getCode();
              }
            }
          })
        }else{
          //没有手机号码提示或手机号码错误提示
          
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

      this.setData({

        phoneHidden: true,

      })

    },
    phoneChangeSave: function () {
      var _this = this;

      if (_this.data.Message == _this.data.Code && _this.data.Code != "") {
        //验证码正确

        wx.request({
          method: 'GET',
          url: "https://www.hgxrshn.com/PhoneChange",
          headers: {
            'Content-Type': 'application/json;charset=UTF-8;'
          },
          data: {
            UserId: wx.getStorageSync('UserId'),
            Phone: _this.data.phone
          },
          success: data => {
            if (data == "failure") {
              //出现异常
            } else {
              this.setData({

                phoneHidden: true,

              })
              wx.setStorage({
                key: 'UserPhone',
                data: _this.data.phone
              })
            }
          }
        })              
        _this.setData({

          modalHidden: true,

        })
        var status = true;
        _this.triggerEvent('phoneOk', status);
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1500
        })        
      } else {

        //验证失败
        //提示验证失败
        wx.showToast({
          title: '验证码错误',
          icon: 'failure',
          duration: 1500
        })
      }

    }

  }

})
