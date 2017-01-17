module Web::Views::Users
  class ResetQueue
    include Web::View
    include Web::Views::CommonInfo
    
    template 'work/configuration'
  end
end
