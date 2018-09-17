// pages/cart1/cart1.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts: [], 
    carts_none:[],    
    iscart: false,
    visible: false,
    ButtonText:"下单试穿",
    EditText:"编辑",
    tip:false,
    pastProduct:true,
    HiddenNone:true, //默认隐藏失效商品
    select_carts:[] //操作id
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'Cart',
      data: {
        UserId: wx.getStorageSync('UserId'),
      },
      success: data => {
        console.log(data)
        if(data[0].length == 0 && data[1].length == 0){
          _this.setData({
            iscart:false
          })
        }else{
          if(data[1].length == 0){
            _this.setData({
              carts: data[0],
              carts_none: data[1],
              iscart:true,
              pastProduct: false
            })            
          }else{
            
            _this.setData({
              carts: data[0],
              carts_none: data[1],
              HiddenNone:false,
              iscart: true
            })
          }                   
        }
      }
    })
  },
  handleOpen() {
    this.setData({
      visible: true
    });
  },
  onCancel:function(){
    this.setData({
      visible: false
    });    
  },
  onConfirm:function(){
    //交互
    var IdList = new Array();
    for (var i = 0; i < this.data.carts.length; i++) {
        IdList.push([this.data.carts[i]["id"], this.data.carts[i]["Model"]])
    }
    for (var i = 0; i < this.data.carts_none.length; i++) {
        IdList.push([this.data.carts_none[i]["id"], this.data.carts_none[i]["Model"]])
    }
    ajax.request({
      method: 'GET',
      url: 'DelCart',
      data: {
        Id: IdList,
        UserId: wx.getStorageSync('UserId'),
      },
      success: data => {
        if (data == "success") {
          //删除成功
          this.setData({
            carts: [],
            carts_none: [],
            ButtonText: "下单试穿",
            EditText: "编辑"
          })
        }else{
          //删除失败
        }
      }
    })
    this.setData({
      visible: false,
      carts:[],
      carts_none:[],
      ButtonText:"下单试穿",
      iscart:false
    });      
  },
  TipCancel: function () {
    this.setData({
      tip: false
    });
  },
  onShow: function () {
    this.onLoad();
  },
  GoShopping: function (e) {
    wx.switchTab({ url: '../main/main' });
  },
  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  

    var index = parseInt(e.currentTarget.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;

    this.setData({
      carts: this.data.carts,
    })
  },
  NoneswitchSelect:function(e){
    // 获取item项的id，和数组的下标值
    if (this.data.ButtonText == "删除"){
      var index = parseInt(e.currentTarget.dataset.index);
      this.data.carts_none[index].CanSelect = !this.data.carts_none[index].CanSelect;
      this.setData({
        carts_none: this.data.carts_none,
      })  
    }else{
        //非删除操作不能作用于失效商品
    }
  },
  //点击编辑切换按钮功能为删除
  ChangeButton:function(e){
    if(this.data.EditText == "编辑"){
      this.setData({
        ButtonText: "删除",
        EditText:"取消"
      })   
    }else{
      this.setData({
        ButtonText: "下单试穿",
        EditText: "编辑"
      })         
    }
   
  },
  //跳转商品详情
  Detail:function(e){
    wx.navigateTo({
      url: '../detail/detail?Id =' + e.currentTarget.dataset.id,
    })
  },
  // 下单或者删除
  toBuy() {
    if(this.data.ButtonText == "删除"){
    //网络交互
      var newSelect = new Array();
      var IdList = new Array();
      for (var i = 0; i < this.data.carts.length;i++){
        if (!this.data.carts[i].isSelect){
          newSelect.push(this.data.carts[i])
        }else{
          IdList.push([this.data.carts[i]["id"], this.data.carts[i]["Model"]])
        }
      } 
      var newSelect2 = new Array();
      for (var i = 0; i < this.data.carts_none.length; i++) {
        if (!this.data.carts_none[i].CanSelect) {
          newSelect2.push(this.data.carts_none[i])
        }else{
          IdList.push([this.data.carts_none[i]["id"], this.data.carts_none[i]["Model"]])
        }
      }
      ajax.request({
        method: 'GET',
        url: 'DelCart',
        data: {
          Id: IdList,
          UserId: wx.getStorageSync('UserId'),
        },
        success: data => {
          if(data == "success"){
            //删除成功
            this.setData({
              carts: newSelect,
              carts_none: newSelect2,
              ButtonText: "下单试穿",
              EditText: "编辑"
            })
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            }) 
          }else{
            //删除失败
          }
        }
      })
       
    }else{
      //下单试穿
      //未注册用户跳转至登陆页面
      if (wx.getStorageSync('Sign') == 0){
        wx.navigateTo({
          url: '../login/login?Id=' + wx.getStorageSync('UserId'),
        })        
      } else if (wx.getStorageSync('Vip') == 0){
        //非会员
        wx.navigateTo({
          url: '../apply-vip/apply-vip',
        })          
      }else{
        var count = 0;
        var id = 0;
        var standard = 0;
        for (var i = 0; i < this.data.carts.length; i++) {
          if (this.data.carts[i].isSelect) {
            count += 1;
            id = this.data.carts[i]['id'];
            standard = this.data.carts[i]['Standard']
          }
        }
        if (count == 0){
          wx.showToast({
            title: '没有选择商品',
            icon: 'error',
            duration: 1500
          })             
        }else if (count > 1) {
          //选择商品数量大于一不能下单
          this.setData({
            tip: true
          })
        } else {
          //跳转至订单确认页面
          wx.navigateTo({
            url: '../orderconfirm/orderconfirm?Id=' + id + "&standard=" + standard,
          })             
        } 
      }

    }

  }
})
