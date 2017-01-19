require 'features_helper'

describe 'Visit new session page' do
  it 'shows login form' do
    visit '/sessions/new'

    page.has_css?('form#session-form').must_equal true
  end
end