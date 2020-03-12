Rails.application.routes.draw do

  resources :scores
  resources :players, only: [:create]
  resources :sessions, only: [:create]
  
end
