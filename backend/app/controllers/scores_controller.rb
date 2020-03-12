class ScoresController < ApplicationController

	def index
		render json: Score.top_ten, include: { player: { only: [:username] } }
	end

	def create
		score = Score.create(number: params[:number], player_id: params[:id])
		render json: score
	end

end
