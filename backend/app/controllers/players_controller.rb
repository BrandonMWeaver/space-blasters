class PlayersController < ApplicationController

	def create
		if Player.find_by(username: params[:username])
			render json: { message: "The username: #{params[:username]} is taken, please choose another" }
		else
			player = Player.new(username: params[:username], password: params[:password])
			if player.save
				render json: player
			else
				render json: { message: "Username must be 3 characters long and no more than 18 characters<br>Password must be 5 characters long" }
			end
		end
	end

end
