require 'features_helper'

describe 'Visit new user page' do
  it 'shows registration form' do
    visit '/users/new'

    page.has_css?('form#user-form').must_equal true
  end

  it 'returns error when users input invalid email' do
    visit '/users/new'

    within("form#user-form") do
      fill_in 'Email', with: 'invalidemail'
      fill_in 'Password', with: 'password'
      find('button[type="submit"]').click
    end

    page.has_css?('form#user-form').must_equal true
    page.body.must_include('Email is in invalid format')  
  end
end