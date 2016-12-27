require 'spec_helper'

describe UserRepository do
  before do
    UserRepository.new.clear
    UserRepository.new.create(
      email: 'john@gmail.com',
        password_salt: 'salt',
        password_hash: 'hash'
      )
  end
  
  it 'finds user by email' do
    users = UserRepository.new.by_email('john@gmail.com')
    users.length.must_equal 1
    users[0].email.must_equal 'john@gmail.com'
  end
end
