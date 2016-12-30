module Web
  module Authentication
    def self.included(action)
      action.class_eval do
        before :authenticate!
        expose :current_user
      end
    end

    private
    def warden
      params.env['warden']
    end
    def authenticate!
      warden.authenticate!
    end

    def current_user
      warden.user
    end
  end
end