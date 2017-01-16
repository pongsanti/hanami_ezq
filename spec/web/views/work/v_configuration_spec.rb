require 'spec_helper'
require_relative '../../../../apps/web/views/work/configuration'

queue_number = 5
ticket_number = 8

user = Object.new
user.instance_eval do
  define_singleton_method(:queue_number) { queue_number }
  define_singleton_method(:ticket_number) { ticket_number }
end

describe Web::Views::Work::Configuration do
  let(:exposures) { Hash[user: user] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/work/configuration.html.erb') }
  let(:view)      { Web::Views::Work::Configuration.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes queue_number' do
    view.user.queue_number.must_equal user.queue_number
  end

  it 'exposes ticket_number' do
    view.user.ticket_number.must_equal user.ticket_number
  end
end
