require 'features_helper'

describe 'Visit home page' do
  email = 'john@gmail.com'
  password = 'sekr3t55'


  describe 'there is a sign up form' do
    before do
      UserRepository.new.create({email: email,
        password_hash: BCrypt::Password.create(password)})
    end

    after do
      UserRepository.new.clear
    end

    it 'shows sign up form' do
      visit '/'

      assert(page.has_css?('form#user-form'))
    end

    it 'creates a new user' do
      new_user_email = 'jane@gmail.com'
      visit '/'

      within('form#user-form') do
        fill_in 'Email', with: new_user_email
        fill_in 'Password', with: password
        fill_in 'Password Confirmation', with: password
        clickSignUpButton
      end

      assert(page.has_link?('Configuration'))
      page.body.must_include(new_user_email)
    end

    it 'shows error when email is invalid' do
      visit '/'

      within('form#user-form') do
        fill_in 'Email', with: 'invalidemail'
        fill_in 'Password', with: 'password'
        fill_in 'Password Confirmation', with: 'password'
        clickSignUpButton
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Email is in invalid format') 
    end

    it 'shows error when email has already been taken' do
      visit '/'

      within('form#user-form') do
        fill_in 'Email', with: email
        fill_in 'Password', with: password
        fill_in 'Password Confirmation', with: password
        clickSignUpButton
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include("#{email} has already been taken") 
    end

    it 'shows error when password not matched' do
      visit '/'

      within('form#user-form') do
        fill_in 'Email', with: 'test@gmail.com'
        fill_in 'Password', with: 'password'
        fill_in 'Password Confirmation', with: 'password_not_matched'
        clickSignUpButton
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Password Confirmation must be equal to password') 
    end

    it 'shows error when password length is less than 8 characters' do
      visit '/'

      within('form#user-form') do
        fill_in 'Email', with: email
        fill_in 'Password', with: '1234'
        fill_in 'Password Confirmation', with: '1234'
        clickSignUpButton
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Password size cannot be less than 8') 
    end            

    describe 'with front end validations' do
      before { Capybara.current_driver = :poltergeist }
      after { Capybara.use_default_driver }
      it 'validates if email is invalid' do
        visit '/'

        within('form#user-form') do
          fill_in 'Email', with: 'invalidemail'
          find('button').trigger 'click'
        end

        assert(page.has_css?('form#user-form'))
        page.body.must_include('Email is invalid')
      end

      it 'validates if fields are empty' do
        visit '/'

        within('form#user-form') do
          find('button').trigger 'click'
        end

        assert(page.has_css?('form#user-form'))
        page.body.must_include('Please enter email')
        page.body.must_include('Please enter password')
        page.body.must_include('Please enter password confirmation')
      end      
    end
  end
end

def clickSignUpButton
  click_button('Sign up')
end