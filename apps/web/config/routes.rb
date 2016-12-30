# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }

resources :sessions, only: [:new, :create, :destroy]
resources :users, only: [:new, :create]

namespace 'auth' do
  get '/', to: 'work#index', as: :work
end