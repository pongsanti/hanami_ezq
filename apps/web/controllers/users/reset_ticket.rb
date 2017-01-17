module Web::Controllers::Users
  class ResetTicket
    include Web::Action
    include Web::Authentication

    def call(params)
      UserRepository.new.reset_ticket(current_user)
      redirect_to routes.configuration_path
    end
  end
end
