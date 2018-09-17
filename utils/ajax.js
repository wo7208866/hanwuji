// Ajax Method
const api = 'https://www.hgxrshn.com/';
// common.js
function request(opt) {
  // set token
  wx.request({
    method: opt.method || 'GET',
    url: api + opt.url,
    headers: {
      'content-type': 'application/json'
    },
    data: opt.data,
    success: function (res) {
      if (res.data.length > 0) {
        if (opt.success) {
          opt.success(res.data);
        }
      } else {
        opt.success("failure")
    }
    }
  })
}

function request2(opt) {
  // set token
  wx.request({
    method: 'POST',
    url: api + opt.url,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8;'
    },
    data: opt.data,
    success: function (res) {
      if (res.data.length > 0) {
        if (opt.success) {
          opt.success(res.data);
        }
      } else {
        opt.success("failure");
      }
    }
  })
}
module.exports = {
  request2:request2,
  request:request
}
