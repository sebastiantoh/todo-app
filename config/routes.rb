Rails.application.routes.draw do
  root 'home#index'

  # /api/v1/tasks
  # /api/v1/tags
  namespace :api do 
    namespace :v1 do 
     resources :tasks, only: [:index, :create, :destroy, :update]
     resources :tags, only: [:index]
    end 
  end 

  # A catch-all, which redirects any other paths to the home 
  # (code must be placed at the bottom)
  get '/*path' => 'home#index'
end
