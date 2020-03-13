Rails.application.routes.draw do

  resources :scores, only: [:index, :create]
  resources :players, only: [:create]
  resources :sessions, only: [:create]
  
end
