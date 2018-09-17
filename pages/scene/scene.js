// pages/scene/scene.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],//数据
    house_type: 0,//版型
    house_style: 0,//颜色
    tabTxt: ['版型', '颜色'],//tab文案
    tab: [true, true, true],
    disabled: false,//加载更多按钮状态
    hasMore: false,//加载更多按钮
    moreTxt: '点击加载更多',
    showLeft: false,
    dataNull: true,
    showLeft: false,
    condition: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    Filter1: [],//颜色
    Filter2: [],//面料
    Filter3: [],//薄厚程度
    Filter4: [],//版型
    Filter5: [],//领型
    Filter6: [],//衣门襟
    Filter7: [],//适用场景
    Filter8: [],//适用季节    
    filterList: {
      "color_list": [{ "id": 1, "name": "黑色" }, { "id": 2, "name": "白色" }, { "id": 3, "name": "蓝色" }, { "id": 4, "name": "黄色" }, { "id": 5, "name": "红色" }, { "id": 6, "name": "紫色" }, { "id": 6, "name": "灰色" }],
      "style_list": [{ "id": 1, "name": "修身型" }, { "id": 2, "name": "标准型" }],
    },
    goodsWelfareItems: [],
    isHideLoadMore: false,
    pages: 1,//页数
    searchLevel: 0, //查找等级,0初级1高级
    SceneId:""
  },
  ProductDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  
  SearchMain: function () {

    var _this = this;
    console.log(_this.data.SceneId)
    ajax.request({
      method: 'GET',
      url: 'SceneSearch',
      data: {
        Style: _this.data.tabTxt[0],
        Color: _this.data.tabTxt[1],
        pages: _this.data.pages,
        Scene: _this.data.SceneId
      },
      success: data => {
        if (data == "failure") {
          //没有商品提示
          wx.showToast({
            title: '没有商品',
            icon: 'loading',
            duration: 1000
          })
        } else {
          if (_this.data.pages == 1) {
            //初始化
            var NewList = data

          } else {
            var NewList = _this.data.goodsWelfareItems.concat(data)

          }
          _this.setData({
            goodsWelfareItems: NewList
          })
        }

      }
    })
  },
  HighSearchMain: function () {
    var _this = this;
    ajax.request({
      method: 'GET',
      url: 'HighSceneSearch',
      data: {
        Color: _this.data.Filter1,
        Fabric: _this.data.Filter2,
        Thickness: _this.data.Filter3,
        Model: _this.data.Filter4,
        Neck: _this.data.Filter5,
        Ymj: _this.data.Filter6,
        Scene: _this.data.SceneId,
        Season: _this.data.Filter8,
        pages: _this.data.pages
      },
      success: data => {
        if (data == "failure") {
          //没有商品提示
          wx.showToast({
            title: '没有商品',
            icon: 'loading',
            duration: 1000
          })
        } else {
          if (_this.data.pages == 1) {
            //初始化
            var NewList = data

          } else {
            var NewList = _this.data.goodsWelfareItems.concat(data)

          }
          _this.setData({
            goodsWelfareItems: NewList
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var _this = this
    _this.setData({
      SceneId:option.Id
    })
    _this.SearchMain()
    console.log(this.data.condition.length)
  },
  //筛选条件
  //颜色
  Condition: function (e) {
    var _this = this;
    var NewCondition = _this.data.condition;
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
    _this.setData({
      Filter1: NewFilter1,
      condition: NewCondition
    });
  },
  //面料
  Condition2: function (e) {
    var _this = this;
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
    _this.setData({
      Filter2: NewFilter,
      condition: NewCondition
    });
  },
  //薄厚程度
  Condition3: function (e) {
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
    _this.setData({
      Filter3: NewFilter,
      condition: NewCondition
    });
  },
  //版型
  Condition4: function (e) {
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
    _this.setData({
      Filter4: NewFilter,
      condition: NewCondition
    });
  },
  //领型
  Condition5: function (e) {
    var _this = this;
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
    _this.setData({
      Filter5: NewFilter,
      condition: NewCondition
    });
  },
  //衣门襟
  Condition6: function (e) {
    var _this = this;
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
    _this.setData({
      Filter6: NewFilter,
      condition: NewCondition
    });
  },
  //适用季节
  Condition8: function (e) {
    var _this = this;
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
    _this.setData({
      Filter8: NewFilter,
      condition: NewCondition
    });
  },
  Clear: function (e) {
    var _this = this;
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
    this.HighSearchMain()
    this.setData({
      showLeft: false,
      searchLevel: 1,
      pages: 1,
      tabTxt: ['版型', '颜色']
    })
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true]
    var index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data,
    })
  },
  //筛选项点击操作
  filter: function (e) {
    var _this = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        _this.setData({
          data: [],
          tab: [true, true, true],
          tabTxt: tabTxt,
          pages: 1,
          searchLevel: 0
        });
        break;
      case '1':
        tabTxt[1] = txt;
        _this.setData({
          pages: 1,
          data: [],
          tab: [true, true, true],
          tabTxt: tabTxt,
          searchLevel: 0
        });
        break;
    }
    //数据筛选
    _this.SearchMain();
  },
  toggleLeft() {
    this.setData({
      showLeft: !this.data.showLeft
    });
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
  //加载更多
  onReachBottom: function () {
    console.log('加载更多');
    var _this = this;
    if (_this.data.searchLevel == 0) {
      //初级查找
      _this.setData({
        pages: _this.data.pages + 1
      })
      _this.SearchMain();
    } else {
      _this.setData({
        pages: _this.data.pages + 1
      })
      _this.HighSearchMain();
    }
    _this.setData({
      isHideLoadMore: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})