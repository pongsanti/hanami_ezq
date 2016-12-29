require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/destroy'

class MyWarden
  attr_accessor :count
  def initialize
    self.count = 0
  end
  def logout
    self.count = self.count + 1
  end
end

myWarden = MyWarden.new

describe Web::Controllers::Sessions::Destroy do
  let(:action) { Web::Controllers::Sessions::Destroy.new }
  let(:params) { Hash[session: {}, 'warden' => myWarden ] }

  it 'is successful' do
    myWarden.count.must_equal 0

    response = action.call(params)
    myWarden.count.must_equal 1
    response[0].must_equal 302
    response[1]['Location'].must_equal '/sessions/new'
  end
end
