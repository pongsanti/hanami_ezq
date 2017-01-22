require 'features_helper'

describe 'Non-logged in user' do
  after do
    Warden.test_reset!  
  end

  describe 'accessing auth required page' do
    it 'result in Log in page' do
      visit '/auth'
      assert(page.has_css?('form#session-form'))
    end
  end

  it 'can access Log in page' do
    visit '/sessions/new'
    assert(page.has_css?('form#session-form'))
  end

  it 'can access Signup page' do
    visit '/users/new'
    assert(page.has_css?('form#user-form'))
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
    assert(page.has_link?('Configuration'))
  end

  describe 'accessing Log in page' do
    it 'result in auth required page' do
      visit '/sessions/new'
      assert(page.has_link?('Configuration'))
    end
  end

  describe 'accessing Sign in page' do
    it 'result in auth required page' do
      visit '/users/new'
      assert(page.has_link?('Configuration'))
    end
  end

  it 'can log out' do
    visit '/auth'
    click_button 'Log out'
    assert(page.has_css?('form#session-form'))
  end
end