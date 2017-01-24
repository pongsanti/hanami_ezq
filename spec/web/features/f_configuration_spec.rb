require 'features_helper'

describe 'Visit queue operator page' do

  describe 'with non-logged in user' do
    it 'shows login page' do
      visit '/auth/configuration'

      page.must_have_text 'Log in'
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
      visit '/auth/configuration'
      page.must_have_text 'Configuration'
      page.must_have_css '.current-queue', text: queue_number
      page.must_have_css '.ticket-queue', text: ticket_number
      page.must_have_css 'div.reset-queue'
      page.must_have_css 'div.reset-ticket'
      page.must_have_css 'input[type="checkbox"].audio-toggle'
    end

    it 'resets queue number' do
      skip('must use javascript driver')
      visit '/auth/configuration'
      page.must_have_text 'Configuration'
      page.must_have_css '.current-queue', text: queue_number

      click_button 'Reset Queue Number'
      page.must_have_text 'Configuration'
      page.must_have_css '.current-queue', text: 0
    end

    it 'resets ticket number' do
      skip('must use javascript driver')
      visit '/auth/configuration'
      page.must_have_text 'Configuration'
      page.must_have_css '.ticket-queue', text: ticket_number

      click_button 'Reset Ticket Number'
      page.must_have_text 'Configuration'
      page.must_have_css '.ticket-queue', text: 0
    end      
  end
end