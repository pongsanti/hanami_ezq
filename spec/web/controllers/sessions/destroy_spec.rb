require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/destroy'

warden = Object.new
warden.instance_eval do
  def count; @count; end
  def logout; @count = 1; end
end

describe Web::Controllers::Sessions::Destroy do
  let(:action) { Web::Controllers::Sessions::Destroy.new }
  let(:params) { Hash[session: {}, 'warden' => warden ] }

  it 'is successful' do
    warden.count.must_equal nil

    response = action.call(params)
    warden.count.must_equal 1
    response[0].must_equal 302
    response[1]['Location'].must_equal '/sessions/new'
  end
end
