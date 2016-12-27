module Web::Controllers::Users
  class Create
    include Web::Action

    expose :user

    params do
      required(:user).schema do
        required(:email).filled(:str?)
        required(:password).filled(:str?).confirmation
        required(:password_confirmation).filled(:str?)
      end
    end
    
    def call(params)
      if params.valid?
        password_salt = BCrypt::Engine.generate_salt
        params[:user][:password_salt] = password_salt

        password_hash = BCrypt::Engine.hash_secret(params[:password], password_salt)
        params[:user][:password_hash] = password_hash

        @user = UserRepository.new.create(params[:user])

        redirect_to routes.new_user_path
      else
        self.status = 422
      end
    end
  end
end
