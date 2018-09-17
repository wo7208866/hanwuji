// pages/honor/honor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'请选择',
    userAdd:'',
    time:'获取验证码',
    phone:'',
    code:'',//验证码
    currentTime: 61,
    userCode:''
  },

  phoneNum(e){
    this.setData({
      phone:e.detail.value
    })
  },

  sendMessage(){
    if(this.data.time=="获取验证码" || this.data.time == "重新发送"){
      if(this.data.phone !=="" ){
        wx.request({
          method:'GET',
          url: 'https://www.hgxrshn.com/SendMessage',
          header:{
            'Content-Type':'application/json;charset=UTF-8;'
          },
          data:{
            UserId:wx.getStorageSync('UserId'),
            Phone:this.data.phone
          },
          success:data=>{
            if(data=="failure"){
              console.log("网络异常")
            }else{
              console.log(data);
              this.setData({
                code:data["data"]
              })
              this.getCode();
            }
          }
        })
      }else{
        //输入框为空的提示
        wx.showToast({
          title: '请填写手机号',
        })
      }
    }
  },

  getCode(){
    var that = this;
    var currentTime = that.data.currentTime;
    var interval = setInterval(function () {
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

  userCode(e){
    console.log(e.detail.value);
    var uCode = e.detail.value;
    this.setData({
      userCode:uCode
    })
  },

  changeAdd(e){
    console.log(e);
    this.setData({
      address:e.detail.value[1]
    })
  },

  formSubmit(e) {
    console.log(e);
    if(e.detail.value.uname==""){
      wx.showModal({
        title: '错误',
        content: '姓名不能为空',
      })
    }else if(e.detail.value.userId == ""){
      wx.showModal({
        title: '错误',
        content: '身份证号不能为空',
      })
    } else if (this.data.address == "请选择") {
      wx.showModal({
        title: '错误',
        content: '请选择您居住的城市',
      })
    }else if(e.detail.value.addressDetail==""){
      wx.showModal({
        title: '错误',
        content: '请输入您的详细住址',
      })
    }else if(e.detail.value.phone == ""){
      wx.showModal({
        title: '错误',
        content: '手机号不能为空',
      })
    }else if(this.data.userCode == this.data.code && this.data.userCode!=""){
      //如果验证码输入正确
      console.log("验证码输入正确");
    }else{
      console.log("验证码不正确");
      wx.showModal({
        title: '错误',
        content: '验证码输入有误，请确认！',
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