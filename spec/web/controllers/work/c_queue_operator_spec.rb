require 'spec_helper'
require_relative '../../../../apps/web/controllers/work/queue_operator'

# stub warden object
current_user = Object.new

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  define_singleton_method :user do
    current_user
  end
end

describe Web::Controllers::Work::QueueOperator do
  let(:action) { Web::Controllers::Work::QueueOperator.new }
  let(:params) { Hash['warden' => warden] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
  
  it 'expose user object' do
    action.call(params)
    action.user.must_be_same_as(current_user)
  end    
end
