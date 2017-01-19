module Web::Views::Users
  class Create
    include Web::View
    include Web::Views::FieldClass
    template 'sessions/new'
  end
end
