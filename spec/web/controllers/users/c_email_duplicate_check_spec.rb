require 'spec_helper'
require_relative '../../../../apps/web/controllers/users/email_duplicate_check'

email = 'john@gmail.com'

describe Web::Controllers::Users::EmailDuplicateCheck do
  let(:action) { Web::Controllers::Users::EmailDuplicateCheck.new }
  let(:params) { Hash[user: { email: email }] }

  after do
    UserRepository.new.clear
  end

  describe 'with non-duplicate email' do
    it 'exposes result object accordingly' do
      response = action.call(params)
      action.result.must_equal({ email: email, duplicate: false })
      response[0].must_equal 200
    end
  end

  describe 'with duplicate email' do
    before do
      UserRepository.new.create(
        email: email,
          password_salt: 'salt',
          password_hash: 'hash'
        )
    end

    it 'exposes result object accordingly' do
      response = action.call(params)
      action.result.must_equal({ email: email, duplicate: true })
      response[0].must_equal 200
    end
  end
end
