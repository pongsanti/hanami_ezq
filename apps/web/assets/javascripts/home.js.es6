$(() => {
  let formId = 'user-form'
  let inputEmail = $('input#user-email')
  userFormValidation()

  $('input#user-email').blur((event) => {
    // put loading class to email input
    let inputEmail = event.currentTarget.value.trim()
    if (/\S/.test(inputEmail)) {
      toggleLoading(true)
      $.post(
        { url: '/users/emailduplicatecheck',
          data: {
            '_csrf_token': $(`form#${formId} input[name='_csrf_token']`).val(),
            'user': { 'email': inputEmail }
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
    }
  })

  function toggleLoading (add) {
    if (add) {
      inputEmail.parent().addClass('loading')
    } else {
      inputEmail.parent().removeClass('loading')
    }
  }

  function userFormValidation () {
    console.log($(`form#${formId}`))
    $(`form#${formId}`)
      .form({
        fields: {
          email: {
            identifier: 'user-email',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your email'
              },
              {
                type: 'email',
                prompt: 'Email is invalid'
              }
            ]
          }
        }
      })
  }
})
