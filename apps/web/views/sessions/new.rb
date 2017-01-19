module Web::Views::Sessions
  class New
    include Web::View

    def field_class(_, _)
      'field'
    end
  end
end
