Rails.application.routes.draw do

  devise_for :users
  get "dashboard/index"
  
  
  namespace :admin do
    get "/dashboard", to: "dashboard#index", as: :dashboard
  end

  resources :customers do
    resources :contacts, only: [:new, :create, :edit, :update, :destroy]
  end

  resources :users do
    resources :contacts, only: [:index]
  end

  resources :leads do
    member do
      post 'convert'  # to convert lead to opportunity
    end
  end
  
  resources :opportunities

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "users#show"

  get "/admin", to: "users#show"

  resources :users, only: [:show, :edit, :update]
end
