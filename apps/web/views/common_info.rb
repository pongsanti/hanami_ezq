module Web::Views
  module CommonInfo

    def queue_number
      user.queue_number
    end
    
    def ticket_number
      user.ticket_number
    end

  end
end