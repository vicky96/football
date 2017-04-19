//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
      select:"index",
      // lists:[{title:"足球现场"},
      //       {title:"足球生活"},
      //       {title:"足球美女"}],
      lists:[],
      navIndex:0,
      hide:true,
      flag:true,
      top:0,
      flag1:true,
      footIndex:0
  },
  onReady(){
    this.setData({
      top:50
    })
  },
  swiperChange(event){
    this.setData({
      navIndex:event.detail.current
    })
  },
  change(event){
    this.setData({
      navIndex:event.target.dataset.index
    })
  },
  onLoad(options){
    this.getList()
  },
  getList(){
    var _this = this;
    // wx.showLoading({//一直都在
    //   mask:true,
    //   title:"loading..."
    // })
    // wx.showToast({//会自己消失
    //   icon:"loading",
    //   title:"loading",
    //   mask:true
    // })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C']
    // })
    wx.setNavigationBarTitle({
      title: '足球圈'
    })
    wx.request({
      url:app.globalData.globalUrl + '/api/list',
      method: 'GET',
      success: function(res){
        // console.log(res.data.data)
        _this.setData({
           lists:res.data.data
        })
        wx.setStorage({
          key: 'lists',
          data: res.data.data
        })
      }
    })
  },
  // onReachBottom(){
  //  console.log(11)
  //  var _this = this;
  //  setTimeout(function(){
  //    wx.request({
  //     url:app.globalData.globalUrl + '/api/list',
  //     method: 'GET',
  //     success: function(res){
  //       // console.log(res.data.data)
  //       _this.setData({
  //          lists:_this.data.lists.concat(res.data.data)
  //       })
  //     }
  //   })
  //  },2000)
  // }
  lower(){
     var _this = this;
     if(this.data.flag){
       this.setData({
         flag:false
       })
        console.log(1)
        setTimeout(function(){
          wx.request({
            url:app.globalData.globalUrl + '/api/list',
            method: 'GET',
            success: function(res){
              // console.log(res.data.data)
              _this.setData({
                flag:true,
                lists:_this.data.lists.concat(res.data.data)
              })
            }
          })
        },1000)
          
     }
     
  },
  upper(){
    var _this = this;
    if(this.data.flag1){
      this.setData({
        flag1:false
      })
      console.log(2)
      setTimeout(function(){
         wx.request({
            url:app.globalData.globalUrl + '/api/list',
            method: 'GET',
            success: function(res){
              console.log(res.data.data)
              _this.setData({
                top:50,
                flag1:true,
                lists:res.data.data.concat(_this.data.lists)
              })
            }
        })
      },1000)
     
    }
    
  }
})
