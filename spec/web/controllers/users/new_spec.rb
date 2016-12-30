require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/new'

warden = Object.new
def warden.authenticate?; end;

describe Web::Controllers::Users::New do
  let(:action) { Web::Controllers::Users::New.new }
  let(:params) { Hash[] }

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
