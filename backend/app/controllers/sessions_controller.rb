class SessionsController < ApplicationController

	def create
		player = Player.find_by(username: params[:username])
		if player && player.authenticate(params[:password])
			render json: player
		else
			render json: { message: "Invalid username and/or password" }
		end
	end

end
