module Web::Controllers::Users
  class ResetQueue
    include Web::Action
    include Web::Authentication

    def call(params)
      UserRepository.new.reset_queue(current_user)
      redirect_to routes.configuration_path
    end
  end
end
