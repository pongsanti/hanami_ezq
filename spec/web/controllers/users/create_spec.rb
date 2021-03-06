require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/create'

describe Web::Controllers::Users::Create do
  let(:action) { Web::Controllers::Users::Create.new }

  after do
    UserRepository.new.clear
  end

  describe 'with valid params' do
    warden = Object.new
    warden.define_singleton_method(:set_user) { |user| @user = user }
    warden.define_singleton_method(:user) { @user }

  
    let(:params) { Hash[user: { email: 'john@gmail.com', 
      password: '1234abcd', password_confirmation: '1234abcd' }, 'warden' => warden] }

    it 'creates a new user' do
      action.call(params)

      action.user.id.wont_be_nil
      action.user.password_hash.wont_be_nil

      warden.user.email.must_equal 'john@gmail.com'
    end

    it 'redirects the user to the authorized main page' do
      response = action.call(params)

      response[0].must_equal 302
      response[1]['Location'].must_equal '/auth'
    end    

  end

  describe 'with invalid params' do
    let(:params) { Hash[user: {}] }

    it 're-renders the users#new view' do
      response = action.call(params)
      response[0].must_equal 422
    end
    
    it 'sets errors attribute accordingly' do
      response = action.call(params)
      response[0].must_equal 422
    
      action.params.errors[:user][:email].must_equal  ['is missing']
      action.params.errors[:user][:password].must_equal  ['is missing', 'size cannot be less than 8']
      action.params.errors[:user][:password_confirmation].must_equal  ['is missing']
    end
  end
end
