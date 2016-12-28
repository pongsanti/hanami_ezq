Warden::Manager.serialize_into_session do |user|
  user.id
end

Warden::Manager.serialize_from_session do |id|
  UserRepository.new.find(id)
end

Warden::Strategies.add(:password) do 
  def valid?
    params['session']['email'] && params['session']['password']
  end
  
  def authenticate!
    email = params['session']['email']
    param_password = params['session']['password']

    user = UserRepository.new.by_email(email)[0]
    user_hash = BCrypt::Password.new(user.password_hash) if user
      
    if user_hash && param_password && user_hash == param_password
      success! user
    else
      fail 'Invalid email or password'
    end
  end
end