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

    page.body.must_include('Configuration')
    page.body.must_include('Queue Info')
    page.body.must_include('Operator')
    page.body.must_include('Queue Ticket')
  end
end