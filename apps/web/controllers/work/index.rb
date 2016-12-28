module Web::Controllers::Work
  class Index
    include Web::Action

    expose :user

    def call(params)
      @user = params.env['warden'].user
    end
  end
end
