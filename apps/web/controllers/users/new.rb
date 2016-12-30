module Web::Controllers::Users
  class New
    include Web::Action

    def call(params)
      if params.env['warden'].authenticate?
        redirect_to routes.work_path
      end
    end
  end
end
