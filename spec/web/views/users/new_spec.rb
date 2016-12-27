require 'spec_helper'
require_relative '../../../../apps/web/views/users/new'

describe Web::Views::Users::New do
  let(:exposures) { Hash[foo: 'bar'] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/users/new.html.erb') }
  let(:view)      { Web::Views::Users::New.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #foo' do
    view.foo.must_equal exposures.fetch(:foo)
  end
end
