module Web::Views::Sessions
  class Create
    include Web::View
    include Web::Views::FieldClass
    template 'sessions/new'
  end
end
