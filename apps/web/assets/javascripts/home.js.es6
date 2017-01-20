$(() => {
  let formId = 'user-form'
  let inputEmail = $('input#user-email')

  $('input#user-email').blur((event) => {
    // put loading class to email input
    toggleLoading(true)
    $.post(
      { url: '/users/emailduplicatecheck',
        data: {
          '_csrf_token': $(`form#${formId} input[name='_csrf_token']`).val(),
          'user': { 'email': $(`form#${formId} input#user-email`).val() }
        },
        dataType: 'json'
      }, (data) => {
      console.log(data)
      //console.log('success')
    }).fail(() => {
      //console.log('failure')
    }).always(() => {
      toggleLoading(false)
    })
  })

  function toggleLoading(add) {
    if(add) {
      inputEmail.parent().addClass('loading')
    } else {
      inputEmail.parent().removeClass('loading')
    }
  }
})
