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
        clickLogInButton
      end

      assert(page.has_link?('Configuration'))
    end

    it 'shows error when user not exist' do
      visit '/'

      within("form#session-form") do
        fill_in 'Email', with: 'nouser@email.com'
        fill_in 'Password', with: 'password'
        clickLogInButton
      end

      assert(page.has_css?('form#session-form'))
      page.body.must_include('Invalid email or password')
    end    

    it 'shows error when email is invalid' do
      visit '/'

      within("form#session-form") do
        fill_in 'Email', with: 'invalidemail'
        fill_in 'Password', with: 'password'
        clickLogInButton
      end

      assert(page.has_css?('form#session-form'))
      page.body.must_include('Email is in invalid format') 
    end

    describe 'with front end validations' do
      before { Capybara.current_driver = :poltergeist }
      after { Capybara.use_default_driver }
      it 'validates if email is invalid' do
        visit '/'


        within('form#session-form') do
          fill_in 'Email', with: 'invalidemail'
          find('button').trigger('click')
        end

        assert(page.has_css?('form#session-form'))
        page.body.must_include('Email is invalid')
      end

      it 'validates if fields are empty' do
        visit '/'

        within('form#session-form') do
          find('button').trigger('click')
        end

        assert(page.has_css?('form#session-form'))
        page.body.must_include('Please enter your email')
        page.body.must_include('Please enter your password')
      end       
    end
  end
end

def clickLogInButton
  click_button('Log in')
end