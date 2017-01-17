require 'features_helper'

describe 'Visit queue info page' do

  describe 'with non logged-in user' do
    it 'shows log in page' do
      visit '/auth/queueinfo'

      page.body.must_include 'Log in'
    end
  end
  
  describe 'with logged-in user' do
    queue_number = 5

    before do
      login_as UserRepository.new.create({email: 'john@gmail.com', 
        password_hash: 'hash', queue_number: queue_number})
    end

    after do
      Warden.test_reset!
      UserRepository.new.clear
    end  
    
    it 'shows current Q number' do
      visit '/auth/queueinfo'

      page.body.must_include('Queue Info')
      page.has_css?('h1.current_queue', text: queue_number).must_equal true
      page.has_css?('input[type="checkbox"].audio-toggle').must_equal true
    end
  end
end