require 'spec_helper'
require_relative '../../../../apps/web/controllers/work/configuration'

# stub warden object
current_user = Object.new

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  define_singleton_method :user do
    current_user
  end
end

describe Web::Controllers::Work::Configuration do
  let(:action) { Web::Controllers::Work::Configuration.new }
  let(:params) { Hash['warden' => warden] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end

  it 'exposes user' do
    action.call(params)
    action.user.must_be_same_as current_user
  end
end
