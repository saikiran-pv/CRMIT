Rails.application.routes.draw do

  devise_for :users, skip: [:sessions]

  devise_scope :user do
     post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
  end

  namespace :api do
    namespace :v1 do
      get "/profile", to: "users#show", as: :profile
      get "/me", to: "users#me"
      resources :dashboard, only: [:index]

      resources :customers do
        resources :contacts, only: [ :new, :create, :edit, :update, :destroy ]
      end

      resources :contacts
      resources :customers, only: [:index]   # top-level customers route

      resources :leads    # top-level contacts route
      post "leads/:id/convert", to: "leads#convert"
      resources :opportunities   # top-level customers route
    end
  end
  
  # get "dashboard/index"

  namespace :api do
    namespace :admin do
      root "dashboard#index"

      get "/dashboard", to: "dashboard#index", as: :dashboard
      get "/profile", to: "users#show", as: :profile
      get "/settings", to: "settings#show", as: :app_settings
    end
  end



  # resources :users do
  #   resources :contacts, only: [ :index ]
  # end

  # resources :leads do
  #   member do
  #     post "convert"  # to convert lead to opportunity
  #   end
  # end

  # resources :opportunities


  # # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # # Can be used by load balancers and uptime monitors to verify that the app is live.
  # # get "up" => "rails/health#show", as: :rails_health_check

  # # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # # Defines the root path route ("/")
  # root "users#show"

  # # get "/admin", to: "users#show"

  # resources :users, only: [ :show, :edit, :update ]
end
