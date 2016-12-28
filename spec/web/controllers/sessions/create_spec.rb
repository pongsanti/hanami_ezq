require 'spec_helper'
require_relative '../../../../apps/web/controllers/sessions/create'

describe Web::Controllers::Sessions::Create do
  let(:action) { Web::Controllers::Sessions::Create.new }

  describe 'with valid params' do
    let(:params) { Hash[session: { email: 'johny@gmail.com', password: '1234abcd' }] }

    before do
      UserRepository.new.clear
      # create a user in database
      user_create_action = Web::Controllers::Users::Create.new
      local_params = Hash[user: { email: params[:session][:email], 
        password: params[:session][:password],
        password_confirmation: params[:session][:password] }]
      user_create_action.call(local_params)

      user = UserRepository.new.by_email('johny@gmail.com')[0]
    end

    it 'logs user in' do

      response = action.call(params)
      
      user_id = action.session[:user_id]
      user_id.wont_be_nil
      (UserRepository.new.find(user_id)).email.must_equal params[:session][:email]

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