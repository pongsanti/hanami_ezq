require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/reset_ticket'

# stub warden object
current_user = Object.new

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  define_singleton_method :user do
    current_user
  end
end

describe Web::Controllers::Users::ResetTicket do
  let(:action) { Web::Controllers::Users::ResetTicket.new }
  let(:params) { Hash['warden' => warden] }

  before do
    current_user = UserRepository.new.create({email: 'john@gmail.com',
      password_hash: 'hash',
      ticket_number: 15})
  end

  after do
    UserRepository.new.clear
  end

  it 'redirects to configuration page' do
    response = action.call(params)
        
    response[0].must_equal 302
    response[1]['Location'].must_equal '/auth/configuration'
  end

  it 'update queue number' do
    response = action.call(params)
    UserRepository.new.by_email('john@gmail.com')[0].ticket_number.must_equal 0

    response[0].must_equal 302
    response[1]['Location'].must_equal '/auth/configuration'
  end
end
