$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则，不要随便加空格
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框的内容
      // 还需要拿到密码框的内容
      // 然后进行两个值的判断
      // 判断失败则返回错误提示消息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认的提交请求
    e.preventDefault()
    // 发起Ajax的POST请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
    })
    // 以下一行代码是为了暴力转换，因为作者提供的接口不能使用了
    location.href = '/index.html'
    // 模拟人的点击行为，注册完之后直接跳到登录界面
    $('#link_login').click()
  })

  // 监听d登录表单的提交事件
  $('#form_reg').submit(function (e) {
    // 阻止默认的提交请求
    e.preventDefault()
    // 发起Ajax的POST请求
    $.ajax({
      url: '/api/login',
      methods: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败！')
        }
        layer.msg('登陆成功！')
        // 将登录成功得到的token字符串，保存到localstorage
        localStorage.setItem('token', res.token)
        // console.log(res.token)
        // 跳转到后台主页
        // location.href = '/index.html'
      }

    })
  })
})