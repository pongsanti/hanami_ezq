require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/new'

warden = Object.new
def warden.authenticate?; end;

describe Web::Controllers::Sessions::New do
  let(:action) { Web::Controllers::Sessions::New.new }

  describe 'user not signed in' do
    let(:params) { Hash['warden' => warden] }
    it 'is successful' do
      warden.stub :authenticate?, false do
        response = action.call(params)
        response[0].must_equal 200
      end      
    end
  end

  describe 'user signed in' do
    let(:params) { Hash['warden' => warden] }
    it 'is successful' do
      warden.stub :authenticate?, true do
        response = action.call(params)
        response[0].must_equal 302
        response[1]['Location'].must_equal('/auth')
      end
    end
  end
end
