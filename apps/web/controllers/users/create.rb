require_relative '../validation'

module Web::Controllers::Users

  class Create
    include Web::Action

    expose :user

    params do
      required(:user).schema do
        required(:email).filled(:str?, format?: Web::Validation::EMAIL_REGEX )
        required(:password).filled(:str?, min_size?: 8).confirmation
        required(:password_confirmation).filled(:str?)
      end
    end
    
    def call(params)
      if params.valid?
        # check email duplicate
        unless UserRepository.new.by_email(params[:user][:email]).empty?
          params[:user][:error] = "#{params[:user][:email]} has already been taken"
          self.status = 422
          return
        end

        params[:user][:password_hash] = BCrypt::Password.create(params[:user][:password])

        @user = UserRepository.new.create(params[:user])
        # set user to warden
        params.env['warden'].set_user(@user)
        # redirects user to authorization area main menu
        redirect_to routes.work_path
      else
        self.status = 422
      end
    end
  end

end
