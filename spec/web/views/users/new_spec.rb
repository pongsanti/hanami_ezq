require 'spec_helper'
require_relative '../../../../apps/web/views/users/new'

class NewUserParams < Hanami::Action::Params
  params do
    required(:user).schema do
      required(:email).filled(:str?)
      required(:password).filled(:str?).confirmation
      required(:password_confirmation).filled(:str?)
    end
  end
end

describe Web::Views::Users::Create do
  let(:params)    { NewUserParams.new(user: {}) }
  let(:exposures) { Hash[params: params] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/users/new.html.erb') }
  let(:view)      { Web::Views::Users::Create.new(template, exposures) }
  let(:rendered)  { view.render }

  describe 'with valid params' do
    it 'displays sign up form' do
      rendered.must_match(/input type="text".*name="user\[email\]/)
      rendered.must_match(/input type="password".*name="user\[password\]/)
      rendered.must_match(/input type="password".*name="user\[password_confirmation\]/)
    end
  end

  describe 'with invalid params' do
    it 'displays list of errors when params contains errors' do
      params.valid? # trigger validations

      rendered.must_include('There was a problem with your submission')
      rendered.must_include('Email is missing')
      rendered.must_include('Password is missing')
      rendered.must_include('Password Confirmation is missing')
    end
  end
  
end


