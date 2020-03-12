Rails.application.routes.draw do

  resources :players, only: [:create]
  resources :sessions, only: [:create]
  
end
