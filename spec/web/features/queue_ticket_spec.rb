require 'features_helper'

describe 'Visit queue info page' do
  
  before do
    login_as UserRepository.new.create({email: 'john@gmail.com', password_hash: 'hash'})
  end

  after do
    Warden.test_reset!
    UserRepository.new.clear
  end  
  
  it 'shows current Q number' do
    visit '/auth/queueticket'

    page.body.must_include('Queue Ticket')
    assert page.has_css?('h1.current_queue')
    assert page.has_css?('button.request_ticket')
  end
end