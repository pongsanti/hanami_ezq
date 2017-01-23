/* global $ */

$(() => {
  sessionFormValidation()

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
      }).fail(() => {
        // console.log('failure')
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

  function sessionFormValidation () {
    $(`form#session-form`)
      .form({
        fields: {
          email: {
            identifier: 'session-email',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter your email'
              },
              {
                type: 'email',
                prompt: 'Email is invalid'
              }
            ]
          },
          password: {
            identifier: 'session-password',
            rules: [{
              type: 'empty',
              prompt: 'Please enter your password'
            }]
          }
        }
      })
  }
  

  function userFormValidation () {
    $(`form#${formId}`)
      .form({
        fields: {
          email: {
            identifier: 'user-email',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter email'
              },
              {
                type: 'email',
                prompt: 'Email is invalid'
              }
            ]
          },
          password: {
            identifier: 'user-password',
            rules: [{
              type: 'empty',
              prompt: 'Please enter password'
            }]
          },
          password_confirmation: {
            identifier: 'user-password-confirmation',
            rules: [{
              type: 'empty',
              prompt: 'Please enter password confirmation'
            }]
          }
        }
      })
  }
})
