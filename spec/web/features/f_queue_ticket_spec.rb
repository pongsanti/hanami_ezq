require 'features_helper'

describe 'Visit queue info page' do

  queue_number = 5
  ticket_number = 8
  
  before do
    login_as UserRepository.new.create({email: 'john@gmail.com',
      password_hash: 'hash',
      queue_number: queue_number,
      ticket_number: ticket_number})
  end

  after do
    Warden.test_reset!
    UserRepository.new.clear
  end  
  
  it 'shows current Q number' do
    visit '/auth/queueticket'

    page.body.must_include('Queue Ticket')
    page.has_css?('h1.current_queue', text: queue_number).must_equal true
    page.has_css?('h1.ticket_queue', text: ticket_number).must_equal true
    page.has_css?('button.request_ticket').must_equal true
  end
end