require 'features_helper'

describe 'Visit queue info page' do

  describe 'with non logged-in user' do
    it 'shows log in page' do
      visit '/auth/queueticket'

      page.body.must_include 'Log in'
    end
  end

  describe 'with logged-in user' do

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

      page.must_have_css 'p.current-queue', text: queue_number
      page.must_have_css 'p.ticket-queue', text: ticket_number
      page.must_have_css 'div.request-ticket'
    end
  end
end