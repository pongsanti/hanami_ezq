require_relative '../validation'

module Web::Controllers::Sessions
  class Create
    include Web::Action

    params do
      required(:session).schema do
        required(:email).filled(:str?, format?: Web::Validation::EMAIL_REGEX )
        required(:password).filled(:str?)
      end
    end

    def call(params)
      if params.valid?
        params.env['warden'].authenticate!
        redirect_to routes.work_path
      end
      self.status = 422
    end
  end
end
