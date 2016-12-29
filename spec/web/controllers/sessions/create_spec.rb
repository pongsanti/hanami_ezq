require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/create'

# mock warden
class MyWarden
  attr_accessor :count
  def initialize
    self.count = 0
  end

  def authenticate!
    self.count = self.count + 1
  end
end

myWarden = MyWarden.new

describe Web::Controllers::Sessions::Create do
  let(:action) { Web::Controllers::Sessions::Create.new }

  describe 'with valid params' do
    let(:params) { Hash[session: { email: 'johny@gmail.com', password: '1234abcd' },
    'warden' => myWarden ] }

    it 'logs user in' do

      response = action.call(params)
      
      myWarden.count.must_equal 1
      response[0].must_equal 302
      response[1]['Location'].must_equal '/auth'
    end
  end

  describe 'with invalid params' do
    let(:params) { Hash[session: {}] }

    it 're-renders the sessions#new view' do
      response = action.call(params)
      response[0].must_equal 422
    end
    
    it 'sets errors attribute accordingly' do
      response = action.call(params)
      response[0].must_equal 422
    
      action.params.errors[:session][:email].must_equal  ['is missing']
      action.params.errors[:session][:password].must_equal  ['is missing']
    end
  end

end
