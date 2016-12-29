require 'spec_helper'
require_relative '../../../../apps/web/controllers/work/index'

class MyWarden
  attr_accessor :user
end

describe Web::Controllers::Work::Index do
  let(:action) { Web::Controllers::Work::Index.new }
  let(:params) { Hash['warden' => MyWarden.new] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
end
