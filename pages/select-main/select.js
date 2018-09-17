// pages/select-main/select.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    Filter1: [],//颜色
    Filter2: [],//面料
    Filter3: [],//薄厚程度
    Filter4: [],//版型
    Filter5: [],//领型
    Filter6: [],//衣门襟
    Filter7: [],//适用场景
    Filter8: []//适用季节 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];

    _this.setData({
      condition: pre_page.data.condition,
      Filter1: pre_page.data.Filter1,//颜色
      Filter2: pre_page.data.Filter2,//面料
      Filter3: pre_page.data.Filter3,//薄厚程度
      Filter4: pre_page.data.Filter4,//版型
      Filter5: pre_page.data.Filter5,//领型
      Filter6: pre_page.data.Filter6,//衣门襟
      Filter7: pre_page.data.Filter7,//适用场景
      Filter8: pre_page.data.Filter8,//适用季节  
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
 
  Condition: function (e) {
    var _this = this;
    var NewCondition = _this.data.condition;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    console.log(NewCondition);
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }
    console.log(_this.data.Filter1)
    var Check = _this.data.Filter1.indexOf(e.currentTarget.dataset.text);
    var NewFilter1 = _this.data.Filter1
    if (Check == -1) {
      NewFilter1.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter1.splice(Check, 1);
    }
    pre_page.setData({
      Filter1: NewFilter1,
      condition: NewCondition
    });
    _this.setData({
      Filter1: NewFilter1,
      condition: NewCondition
    });
  },
  //面料
  Condition2: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter2.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter2;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter2: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter2: NewFilter,
      condition: NewCondition
    });
  },
  //薄厚程度
  Condition3: function (e) {
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var _this = this;
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter3.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter3;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter3: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter3: NewFilter,
      condition: NewCondition
    });
  },
  //版型
  Condition4: function (e) {
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var _this = this;
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter4.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter4;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter4: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter4: NewFilter,
      condition: NewCondition
    });
  },
  //领型
  Condition5: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter5.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter5;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter5: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter5: NewFilter,
      condition: NewCondition
    });
  },
  //衣门襟
  Condition6: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter6.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter6;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter6: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter6: NewFilter,
      condition: NewCondition
    });
  },
  //适用场景
  Condition7: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter7.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter7;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter7: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter7: NewFilter,
      condition: NewCondition
    });
  },
  //适用季节
  Condition8: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    var NewCondition = _this.data.condition;
    if (NewCondition[e.currentTarget.dataset.index] == 1) {
      NewCondition[e.currentTarget.dataset.index] = 0
    } else {
      NewCondition[e.currentTarget.dataset.index] = 1
    }

    var Check = _this.data.Filter8.indexOf(e.currentTarget.dataset.text);
    var NewFilter = _this.data.Filter8;
    if (Check == -1) {
      NewFilter.push(e.currentTarget.dataset.text);
    }
    else {
      NewFilter.splice(Check, 1);
    }
    pre_page.setData({
      Filter8: NewFilter,
      condition: NewCondition
    });
    _this.setData({
      Filter8: NewFilter,
      condition: NewCondition
    });
  },
  Clear: function (e) {
    var _this = this;
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    pre_page.setData({
      condition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      Filter1: [],//颜色
      Filter2: [],//面料
      Filter3: [],//薄厚程度
      Filter4: [],//版型
      Filter5: [],//领型
      Filter6: [],//衣门襟
      Filter7: [],//适用场景
      Filter8: [],//适用季节  
    })
    _this.setData({
      condition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      Filter1: [],//颜色
      Filter2: [],//面料
      Filter3: [],//薄厚程度
      Filter4: [],//版型
      Filter5: [],//领型
      Filter6: [],//衣门襟
      Filter7: [],//适用场景
      Filter8: [],//适用季节  
    })
  },
  Done: function (e) {
    
    var pages = getCurrentPages();
    var pre_page = pages[pages.length - 2];
    
    pre_page.setData({
      showLeft: false,
      searchLevel: 1,
      pages: 1,
      tabTxt: ['版型', '颜色']
    })
    pre_page.HighSearchMain();
    wx.navigateBack({})
  },
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