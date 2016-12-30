module Web::Controllers::Sessions
  class Destroy
    include Web::Action
    include Web::Authentication

    def call(params)
      warden.logout

      redirect_to routes.new_session_path
    end
  end
end
