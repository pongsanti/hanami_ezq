module Web::Controllers::Sessions
  class Create
    include Web::Action

    params do
      required(:session).schema do
        required(:email).filled(:str?)
        required(:password).filled(:str?)
      end
    end

    def call(params)

      email = params[:session][:email]
      param_password = params[:session][:password]
      @user = UserRepository.new.by_email(email)[0]
      user_hash = BCrypt::Password.new(@user.password_hash) if @user
      
      if user_hash && param_password && user_hash == param_password
        session[:user_id] = @user.id

        redirect_to routes.work_path
      else
        self.status = 422
      end
    end
  end
end
