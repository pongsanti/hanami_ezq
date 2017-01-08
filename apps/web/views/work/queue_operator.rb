module Web::Views::Work
  class QueueOperator
    include Web::View

    def queue_number
      user.queue_number
    end

    def ticket_number
      user.ticket_number
    end
  end
end
