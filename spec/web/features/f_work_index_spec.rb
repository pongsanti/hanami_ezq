require 'features_helper'

describe 'Visit work index page' do
  
  before do
    login_as UserRepository.new.create({email: 'john@gmail.com', password_hash: 'hash'})
  end

  after do
    Warden.test_reset!
    UserRepository.new.clear
  end  
  
  it 'shows 4 main menus' do
    visit '/auth'

    page.has_link?('Configuration').must_equal true
    page.has_link?('Queue Info').must_equal true
    page.has_link?('Operator').must_equal true
    page.has_link?('Queue Ticket').must_equal true
  end
end