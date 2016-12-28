module Web::Controllers::Sessions
  class Destroy
    include Web::Action

    def call(params)
      params.env['warden'].logout
    end
  end
end
