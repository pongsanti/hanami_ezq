require 'features_helper'

describe 'Visit home page' do
  email = 'john@gmail.com'
  password = 'sekr3t'

  after do
    UserRepository.new.clear
  end

  describe 'there is a log in form' do
    before do
      UserRepository.new.create({email: email,
        password_hash: BCrypt::Password.create(password)})
    end

    it 'shows login form' do
      visit '/'

      assert(page.has_css?('form#session-form'))
    end

    it 'logs user in' do
      visit '/'

      within("form#session-form") do
        fill_in 'Email', with: email
        fill_in 'Password', with: password
        find('button[type="submit"]').click
      end

      assert(page.has_link?('Configuration'))
    end

    it 'shows error when user not exist' do
      visit '/'

      within("form#session-form") do
        fill_in 'Email', with: 'nouser@email.com'
        fill_in 'Password', with: 'password'
        find('button[type="submit"]').click
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Invalid email or password')
    end    

    it 'shows error when email is invalid' do
      visit '/'

      within("form#session-form") do
        fill_in 'Email', with: 'invalidemail'
        fill_in 'Password', with: 'password'
        find('button[type="submit"]').click
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Email is in invalid format') 
    end

  end

  describe 'there is a sign up form' do
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
        find('button[type="submit"]').click
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
        find('button[type="submit"]').click
      end

      assert(page.has_css?('form#user-form'))
      page.body.must_include('Email is in invalid format') 
    end
  end
end