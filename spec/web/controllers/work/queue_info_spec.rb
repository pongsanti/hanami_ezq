require 'spec_helper'
require_relative '../../../../apps/web/controllers/work/queue_info'

describe Web::Controllers::Work::QueueInfo do
  let(:action) { Web::Controllers::Work::QueueInfo.new }
  let(:params) { Hash[] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
end
