require 'spec_helper'
require_relative '../../../../apps/web/views/work/queue_ticket'

queue_number = 5
ticket_number = 8

user = Object.new
user.instance_eval do
  define_singleton_method(:queue_number) { queue_number }
  define_singleton_method(:ticket_number) { ticket_number }
end

describe Web::Views::Work::QueueTicket do
  let(:exposures) { Hash[user: user] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/work/queue_ticket.html.erb') }
  let(:view)      { Web::Views::Work::QueueTicket.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes user queue number' do
    view.queue_number.must_equal queue_number
  end

  it 'exposes user ticket number' do
    view.ticket_number.must_equal ticket_number
  end
end
