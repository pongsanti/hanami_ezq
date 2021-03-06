require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/destroy'

userObj = Object.new
userObj.define_singleton_method :id do 1; end

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  def count; @count; end
  def logout; @count = 1; end
end

warden.define_singleton_method :user do userObj; end

describe Web::Controllers::Sessions::Destroy do
  let(:action) { Web::Controllers::Sessions::Destroy.new }
  let(:params) { Hash[session: {}, 'warden' => warden ] }

  it 'is successful' do
    warden.count.must_equal nil

    response = action.call(params)
    warden.count.must_equal 1
    response[0].must_equal 302
    response[1]['Location'].must_equal '/'
  end
end
