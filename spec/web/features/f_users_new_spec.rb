require 'features_helper'

describe 'Visit new user page' do
  it 'shows registration form' do
    visit '/users/new'

    assert(page.has_css?('form#user-form'))
  end

  # finds other test cases in home_spec
end