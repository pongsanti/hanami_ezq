require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/reset_queue'

# stub warden object
current_user = Object.new

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  define_singleton_method :user do
    current_user
  end
end

describe Web::Controllers::Users::ResetQueue do
  let(:action) { Web::Controllers::Users::ResetQueue.new }
  let(:params) { Hash['warden' => warden] }

  before do
    current_user = UserRepository.new.create({email: 'john@gmail.com',
      password_hash: 'hash',
      queue_number: 8})
  end

  after do
    UserRepository.new.clear
  end

  it 'exposes user' do
    response = action.call(params)
    action.user.wont_be_nil
    response[0].must_equal 200
  end

  it 'update queue number' do
    response = action.call(params)
    action.user.queue_number.must_equal 0
    response[0].must_equal 200
  end
end
