module Web::Views::Work
  class QueueInfo
    include Web::View

    def queue_number
      user.queue_number
    end
  end
end
