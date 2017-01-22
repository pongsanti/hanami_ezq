require 'features_helper'

describe 'Visit new session page' do
  it 'shows login form' do
    visit '/sessions/new'

    assert(page.has_css?('form#session-form'))
  end

  # finds other test cases in home_spec
end