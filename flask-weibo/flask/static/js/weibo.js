window.onload = main;

function main(){
  $('a.com').on('click', function(){
    $(this).parent().next().slideToggle()
    return false;
  })

  $('a.blog-com').on('click', function(){
    $(this).parent().next().slideToggle()
    return false;
  })

  $('.blog-comment-add').on('click', function(){
      console.log('add button')
      var button = $(this)
      var parent = button.parent()
      var blog_id = parent.find('.comment-blog_id').val()
      console.log('weibo', blog_id)
      var comment = parent.find('.comment-content').val()
      console.log('comment', comment)

      var commentList = parent.parent().find('.comment-list')
      console.log('commentList', commentList)

      var weibo = {
          'blog_id': blog_id,
          'comment': comment
      }
      var request = {
          url: '/blog/comment',
          type: 'post',
          data: weibo,
          success: function() {
              console.log('成功', arguments)
              var response = arguments[0]
              var comment = JSON.parse(response)
              var content = comment.comment
              var avatar = comment.avatar
              var created_time = comment.created_time
              var name = comment.name
              var cell = `
                  <div class="cell-inner item">
                    <img src="${avatar}" class="avatar-s">
                    <span class="comment">${content}</span>
                    <span class="time right span-margin">${created_time}</span>
                    <span class="name right span-margin">by:${name}</span>
                  </div>
              `;
              commentList.append(cell)
              parent.find('.comment-content').val("")

          },
          error: function() {
              console.log('错误', arguments)
          }
      }
      $.ajax(request)
  })


}
