module Web::Controllers::Users
  class ResetQueue
    include Web::Action
    include Web::Authentication

    expose :user

    def call(params)
      @user = UserRepository.new.reset_queue(current_user)
    end
  end
end
