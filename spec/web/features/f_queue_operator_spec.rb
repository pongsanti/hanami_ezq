require 'features_helper'

describe 'Visit queue operator page' do

  describe 'with non-logged in user' do
    it 'shows login page' do
      visit '/auth/queueoperator'

      page.body.must_include('Log in')
    end
  end

  describe 'with logged in user' do
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

    it 'shows information accordingly' do
      visit '/auth/queueoperator'
      page.must_have_text 'Queue Operator'
      page.must_have_css 'h1.current-queue', text: queue_number
      page.must_have_css 'h1.ticket-queue', text: ticket_number
      page.must_have_css 'button.next-queue'
      page.must_have_css 'button.recall-queue'
      page.must_have_css 'input[type="checkbox"].audio-toggle'
    end    
  end
end