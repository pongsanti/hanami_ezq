module Web::Views::Work
  class Configuration
    include Web::View

    def queue_number
      user.queue_number
    end
    
    def ticket_number
      user.ticket_number
    end

  end
end
