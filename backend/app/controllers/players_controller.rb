class PlayersController < ApplicationController

	def create
		player = Player.new(username: params[:username], password: params[:password])
		if player.save
			render json: player
		else
			render json: { message: "An error has occured!" }
		end
	end

end
