class ScoresController < ApplicationController

	def index
		render json: ScoreSerializer.new(Score.top_ten).serialize
	end

	def create
		score = Score.create(number: params[:number], player_id: params[:id])
		render json: ScoreSerializer.new(score).serialize
	end

end
