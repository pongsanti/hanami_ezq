require 'features_helper'

describe 'Non-logged in user' do
  after do
    Warden.test_reset!  
  end

  describe 'accessing auth required page' do
    it 'result in Log in page' do
      visit '/auth'
      page.body.must_include('Log in')
    end
  end

  it 'can access Log in page' do
    visit '/sessions/new'
    page.body.must_include('Log in')
  end

  it 'can access Signup page' do
    visit '/users/new'
    page.body.must_include('Sign up')
  end  
end

describe 'Logged in user' do
  before do
    login_as UserRepository.new.create({email: 'john@gmail.com', password_hash: 'hash'})
  end

  after do
    Warden.test_reset!
    UserRepository.new.clear
  end  

  it 'can access auth required page' do
    visit '/auth'
    page.body.must_include('Authorized area')
  end

  describe 'accessing Log in page' do
    it 'result in auth required page' do
      visit '/sessions/new'
      page.body.must_include('Authorized area')
    end
  end

  describe 'accessing Sign in page' do
    it 'result in auth required page' do
      visit '/users/new'
      page.body.must_include('Authorized area')
    end
  end

  it 'can log out' do
    visit '/auth'
    click_button 'Log out'
    page.body.must_include('Log in')
  end
end