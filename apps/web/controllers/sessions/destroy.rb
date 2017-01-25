module Web::Controllers::Sessions
  class Destroy
    include Web::Action
    include Web::Authentication

    def call(params)
      user_id = current_user.id
      payload = "{ \"user_id\": \"#{user_id}\" }"

      warden.logout
      # notify logout
      UserRepository.new.container.gateways[:default].connection.run "NOTIFY logout, '#{payload}'"

      redirect_to routes.new_session_path
    end
  end
end
