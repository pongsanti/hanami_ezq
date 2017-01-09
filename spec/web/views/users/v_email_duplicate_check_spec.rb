require 'spec_helper'
require_relative '../../../../apps/web/views/users/email_duplicate_check'

result = {email: 'john@gmail.com', duplicate: true}

describe Web::Views::Users::EmailDuplicateCheck do
  let(:exposures) { Hash[result: result] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/users/email_duplicate_check.json.erb') }
  let(:view)      { Web::Views::Users::EmailDuplicateCheck.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'return json response' do
    rendered.must_equal result.to_json
  end
end
