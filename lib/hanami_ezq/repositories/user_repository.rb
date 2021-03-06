class UserRepository < Hanami::Repository
  def by_email(email)
    users
      .where(email: email)
      .to_a
  end
  
  def reset_queue(user)
    update(user.id, queue_number: 0)
  end

  def reset_ticket(user)
    update(user.id, ticket_number: 0)
  end
end
