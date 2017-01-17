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
      page.body.must_include('Queue Operator')
      page.has_css?('h1.current_queue', text: queue_number).must_equal true
      page.has_css?('h1.ticket_queue', text: ticket_number).must_equal true
      page.has_css?('button.next_queue').must_equal true
      page.has_css?('button.recall_queue').must_equal true
      page.has_css?('input[type="checkbox"].audio-toggle').must_equal true      
    end    
  end
end