require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/new'

describe Web::Controllers::Users::New do
  let(:action) { Web::Controllers::Users::New.new }
  let(:params) { Hash[] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
end
