require 'spec_helper'
require_relative '../../../../apps/web/controllers/work/index'

warden = Object.new
warden.instance_eval do
  def authenticate!; end
  def user; end
end

describe Web::Controllers::Work::Index do
  let(:action) { Web::Controllers::Work::Index.new }
  let(:params) { Hash['warden' => warden] }

  it 'is successful' do
    response = action.call(params)
    response[0].must_equal 200
  end
end
