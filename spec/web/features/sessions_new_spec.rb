require 'features_helper'

describe 'Visit new session page' do
  it 'shows login form' do
    visit '/sessions/new'

    page.body.must_include('Log in')
  end
end