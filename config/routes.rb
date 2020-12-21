Rails.application.routes.draw do
  devise_for :add_email_to_users
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'users/jack', to: 'users#jack'
      get 'users/pete', to: 'users#pete'
      post 'users/update', to: 'users#update'
    
      get 'bills/index'
      post 'bills/create'
      get 'bills/show/:id', to: 'bills#show'
      delete 'bills/destroy/:id', to: 'bills#destroy'
  
      get 'things/index'
      post 'things/create'
      get 'things/show/:id', to: 'things#show'
      delete 'things/destroy/:id', to: 'things#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
