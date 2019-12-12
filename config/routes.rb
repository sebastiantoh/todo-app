Rails.application.routes.draw do
  root 'home#index'

  namespace :api do 
    namespace :v1 do 
     resources :tasks, only: [:index, :create, :destroy, :update]
    end 
  end 

  # A catch-all (must be at the bottom)
  get '/*path' => 'home#index'
end
