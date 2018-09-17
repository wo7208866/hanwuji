const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    decrite:[false,false,false],//配饰
    array: ['西安', '宝鸡', '北京'],
    userAdd:'西安',
    condition: false,
    standard_type:0, //规格
    standard_list:[],
    select_standard:"",
    ProductId:"",
    product:{},
    Count:1    
  },

  chooseAdd:function(e){
    console.log(e.detail.value);
    var index = e.detail.value;
    this.setData({
      userAdd:this.data.array[index]
    })
  },
  //关闭遮罩层
  CloseBg:function(){
    var _this = this;
    if(_this.data.condition == true){
      _this.setData({
        condition:false
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //筛选配饰
  selectDecr:function(e){
    var index = e.currentTarget.dataset.index;
    var newDecrite = [false,false,false];
    newDecrite[index] = true;
    this.setData({
      decrite: newDecrite
    })
  },
  //筛选项点击操作
  StandardPicker: function (e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    var text = e.currentTarget.dataset.txt
    _this.setData({
      standard_type: id,
      select_standard:text
    })
    //数据筛选
    // self.getData();
  },
  GoHome:function(){
    wx.switchTab({ url: '../main/main' });
  },
  GoCart: function () {
    wx.switchTab({ url: '../cart/cart' });
  },  
  submit: function (e) {
    //判断尺码是否选择，没有选择作出提示
    var _this = this;
    if (_this.data.select_standard == ""){
        //没有选择尺码，提示用户，不进行下一步
      $Toast({
        content: '请选择商品规格',
        type: 'warning'
      })
    }else{
      _this.setData({
        condition:true
      })
    }

  },
  AddCart:function(){
    //判断是不是
    var _this = this
    ajax.request({
      method: 'GET',
      url: 'AddCart',
      data: {
        Id: _this.data.ProductId,
        UserId: wx.getStorageSync('UserId'),
        Standard:_this.data.standard_type
      },
      success: data => {
        if(data == "failure"){
          //添加失败
        }else{
          //购物车数量加1
          //遮罩层关闭
          var NewCount = _this.data.Count + 1
          _this.setData({
            condition:false,
            Count:NewCount
          })
          wx.showToast({
            title: '已加入购物车',
            icon: 'success',
            duration: 1000
          })
        }
        
      }
    })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var ProductId = option.id
    var _this = this
    ajax.request({
      method: 'GET',
      url: 'ProductDetail',
      data: {
        Id: ProductId,
        UserId: wx.getStorageSync('UserId')
      },
      success: data => {
        if (data == "failure") {
          //异常提示

        }else{
          console.log(data)
          _this.setData({
            product:data[0],
            imgUrls:data[1],
            standard_list:data[2],
            Count:data[3],
            ProductId:option.id
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