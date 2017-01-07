require 'features_helper'

describe 'Visit queue info page' do
  
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
  end
end