module Web::Controllers::Work
  class Configuration
    include Web::Action
    include Web::Authentication

    expose :user

    def call(params)
      @user = current_user
    end
  end
end
