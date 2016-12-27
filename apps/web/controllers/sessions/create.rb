module Web::Controllers::Sessions
  class Create
    include Web::Action

    def call(params)

      email = params[:session][:email]
      password = params[:session][:password]
      @user = UserRepository.new.by_email(email)[0]

      #if @user && @user.password_hash == BCrypt::Engine.hash_secret(password, @user.password_salt)
      #  session[:user_id] = @user.id
      #else

      #end
    end
  end
end
