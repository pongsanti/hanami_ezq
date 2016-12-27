require 'features_helper'

describe 'Visit new user page' do
  it 'shows registration form' do
    visit '/users/new'

    page.body.must_include('Sign up')
  end
end