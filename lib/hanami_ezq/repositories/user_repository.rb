class UserRepository < Hanami::Repository
  def by_email(email)
    users
      .where(email: email)
      .to_a
  end
end
