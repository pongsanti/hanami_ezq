module Web::Controllers::Work
  class Index
    include Web::Action
    include Web::Authentication

    expose :user

    def call(params)
      @user = current_user
    end
  end
end
