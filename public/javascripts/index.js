$('#logout').on('click', function () {

    $.post('/logout', function (data) {
      if (data.code != 200) {
        $('#myModal .modal-body').text('注销出现异常!');
        $('#myModal').modal();
        return;
      }
      // href默认get请求，url地址也是
      location.href = '/login';
    })
})
// 获取当前激活状态下的url路径中的path属性，如/students/add
var activeLink = purl().data.attr.path;
// 先把所有的带有类名为.list-group的元素下的a标签所对应的父元素li 然后把他的样式类active移除
$('.list-group a').parent().removeClass('active');
// 再把当前激活的url所对应的a标签的父元素li添加一个样式类active
$(`.list-group a[href='${activeLink}']`).parent().addClass('active');//parent()取当前元素的直接父元素
// 先把所有的都折叠，再打开一个
$('.panel-title a').attr('aria-expanded', false);
$('.panel-collapse').removeClass('in');

if($(`.list-group a[href='${activeLink}']`).length == 0){
  $('.panel-title:first a').attr('aria-expanded',true);
  $('.panel-collapse:first').addClass('in');
}else{
  $(`.list-group a[href='${activeLink}']`).closest('.panel-default').find('.panel-title a').attr('aria-expanded', true);
  $(`.list-group a[href='${activeLink}']`).closest('.panel-collapse').addClass('in');
}







