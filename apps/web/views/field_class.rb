module Web::Views
  module FieldClass

    def field_class(model_name, field_name)
      if params && params.errors && params.errors[model_name]
        return 'field error' if params.errors[model_name][field_name]
      end
      'field'
    end
    
  end
end