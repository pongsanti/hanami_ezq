require 'spec_helper'

describe User do
  after do
    UserRepository.new.clear
  end

  it 'can be initialised with attributes' do
    user = User.new(email: 'john@gmail.com')
    user.email.must_equal 'john@gmail.com'
  end
end
