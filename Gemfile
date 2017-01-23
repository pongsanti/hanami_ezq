source 'https://rubygems.org'

gem 'bundler'
gem 'rake'
gem 'hanami',       '~> 0.9'
gem 'hanami-model', '~> 0.7'

gem 'pg'
gem 'bcrypt'
gem 'warden'
gem 'tzinfo'
# pdf
gem 'pdfkit'
gem 'wkhtmltopdf-binary-edge', '~> 0.12.4.0'

group :development do
  # Code reloading
  # See: http://hanamirb.org/guides/projects/code-reloading
  gem 'shotgun'
end

group :test, :development do
  gem 'dotenv', '~> 2.0'
  gem 'babel-transpiler'
  gem 'pry'
end

group :test do
  gem 'minitest'
  gem 'minitest-reporters'
  gem 'capybara'
  gem 'capybara_minitest_spec'
  gem 'poltergeist'
end

group :production do
  # gem 'puma'
end
