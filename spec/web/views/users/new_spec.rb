require 'spec_helper'
require_relative '../../../../apps/web/views/users/new'

describe Web::Views::Users::New do
  let(:exposures) { Hash[params: {}] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/users/new.html.erb') }
  let(:view)      { Web::Views::Users::New.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'displays sign up form' do
    rendered.must_match('user[email]')
    rendered.must_match('user[password]')
    rendered.must_match('user[confirm_password]')
  end
end
