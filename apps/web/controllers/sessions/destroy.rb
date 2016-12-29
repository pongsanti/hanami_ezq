module Web::Controllers::Sessions
  class Destroy
    include Web::Action

    def call(params)
      params.env['warden'].logout

      redirect_to routes.new_session_path
    end
  end
end
