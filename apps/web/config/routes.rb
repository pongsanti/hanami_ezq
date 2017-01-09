# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }
root to: 'sessions#new'

resources :sessions, only: [:new, :create, :destroy]
resources :users, only: [:new, :create]
post '/users/emailduplicatecheck', to: 'users#email_duplicate_check', as: :email_duplicate_check

namespace 'auth' do
  get '/',              to: 'work#index',         as: :work
  get '/queueinfo',     to: 'work#queueInfo',     as: :queue_info
  get '/queueticket',   to: 'work#queueTicket',   as: :queue_ticket
  get '/queueoperator', to: 'work#queueOperator', as: :queue_operator
end