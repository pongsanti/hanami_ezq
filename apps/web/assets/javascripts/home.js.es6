/* global $ */

$(() => {
  sessionFormValidation()

  let formId = 'user-form'
  let inputEmail = $('input#user-email')
  let errorDiv = $('div#duplicated-email-error')
  userFormValidation()

  $('input#user-email').blur((event) => {
    // put loading class to email input
    let inputEmail = event.currentTarget.value.trim()
    if (/\S/.test(inputEmail)) {
      toggleLoading(true)

      let postData = {
        '_csrf_token': $(`form#${formId} input[name='_csrf_token']`).val(),
        'user': { 'email': inputEmail }
      }

      $.post(
        { url: '/users/emailduplicatecheck',
          data: postData,
          dataType: 'json'
        }, (data) => {
        if (data.duplicate) {
          errorDiv.html(`${data.email} has already been taken`).show()
        } else {
          errorDiv.hide()
        }
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
            }, {
              type: 'minLength[8]',
              prompt: 'Your password must be at least {ruleValue} characters'
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

  // Login, Signup menu
  let loginLink = $('a#login-link')
  let signupLink = $('a#signup-link')
  let loginSegment = $('#login-segment')
  let signupSegment = $('#signup-segment')
  loginLink.click((event) => {
    loginLink.addClass('active')
    signupLink.removeClass('active')
    loginSegment.show()
    signupSegment.hide()

  })
  signupLink.click((event) => {
    signupLink.addClass('active')
    loginLink.removeClass('active')
    signupSegment.show()
    loginSegment.hide()
  })

})
