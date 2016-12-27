require 'spec_helper'
require_relative '../../../../apps/web/views/sessions/new'

describe Web::Views::Sessions::New do
  let(:exposures) { Hash[params: {}] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/sessions/new.html.erb') }
  let(:view)      { Web::Views::Sessions::New.new(template, exposures) }
  let(:rendered)  { view.render }

  describe 'with valid params' do
    it 'displays login form' do
      rendered.must_match('session[email]')
      rendered.must_match('session[password]')
    end
  end
end
