require 'spec_helper'

describe UserRepository do
  before do
    UserRepository.new.create(
      email: 'john@gmail.com',
        password_hash: 'hash',
        queue_number: 99
      )
  end

  after do
    UserRepository.new.clear
  end
  
  it 'finds user by email' do
    users = UserRepository.new.by_email('john@gmail.com')
    users.length.must_equal 1
    users[0].email.must_equal 'john@gmail.com'
  end

  it 'resets queue number' do
    users = UserRepository.new.by_email('john@gmail.com')
    users[0].wont_be_nil
    user = UserRepository.new.reset_queue(users[0])
    user.queue_number.must_equal 0
  end
end
