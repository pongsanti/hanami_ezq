module Web::Controllers::Users
  class EmailDuplicateCheck
    include Web::Action

    accept :json

    params do
      required(:user).schema do
        required(:email).filled(:str?)
      end
    end

    expose :result

    def call(params)
      email = params[:user][:email]
      @result = {
        email: email,
        duplicate: !UserRepository.new.by_email(params[:user][:email]).empty?
      }
    end
  end
end
