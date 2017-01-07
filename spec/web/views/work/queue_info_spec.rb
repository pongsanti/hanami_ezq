require 'spec_helper'
require_relative '../../../../apps/web/views/work/queue_info'

queue_number = 5
user = Object.new
user.instance_eval do
  define_singleton_method :queue_number do
    queue_number
  end
end

describe Web::Views::Work::QueueInfo do
  let(:exposures) { Hash[user: user] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/work/queue_info.html.erb') }
  let(:view)      { Web::Views::Work::QueueInfo.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes user queue number' do
    view.queue_number.must_equal queue_number
  end
end
