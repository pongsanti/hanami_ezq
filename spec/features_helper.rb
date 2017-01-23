# Require this file for feature tests
require_relative './spec_helper'

require 'capybara'
require 'capybara/dsl'

# poltergeist
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

Capybara.app = Hanami.app

class MiniTest::Spec
  include Capybara::DSL
  include Warden::Test::Helpers
end
