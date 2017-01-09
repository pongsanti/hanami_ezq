$(function () {
  var formId = 'user-form'
  var checkDuplicateButton = $('#user-check-duplicate-email')
  checkDuplicateButton.click(function () {
    $.post(
      { url: '/users/emailduplicatecheck',
        data: {
          '_csrf_token': $(`form#${formId} input[name='_csrf_token']`).val(),
          'user': { 'email': $(`form#${formId} input#user-email`).val() }
        },
        success: function (data) {
          console.log(data)
        },
        dataType: 'json'
    })
  })
})
