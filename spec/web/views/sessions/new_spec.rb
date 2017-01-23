require 'spec_helper'
require_relative '../../../../apps/web/views/sessions/new'

class NewSessionParams < Hanami::Action::Params
  params do
    required(:session).schema do
      required(:email).filled(:str?)
      required(:password).filled(:str?)
    end
  end
end

class MyWarden
  attr_accessor :message
end

describe Web::Views::Sessions::New do
  let(:params)    { NewSessionParams.new(session: {}, 'warden' => MyWarden.new) }
  let(:exposures) { Hash[params: params] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/sessions/new.html.erb') }
  let(:view)      { Web::Views::Sessions::New.new(template, exposures) }
  let(:rendered)  { view.render }

  describe 'with valid params' do
    it 'displays login form' do
      rendered.must_match(/input type="text".*name="session\[email\]/)
      rendered.must_match(/input type="password".*name="session\[password\]/)
    end
  end

  describe 'with invalid params' do
    it 'displays list of errors when params contains errors' do
      params.valid? # trigger validations

      rendered.must_include('Email is missing')
      rendered.must_include('Password is missing')
    end
  end
end
