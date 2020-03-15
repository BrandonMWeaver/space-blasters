class ScoreSerializer

	def initialize(score)
		@score = score
	end

	def serialize
		return @score.to_json(include: { player: { only: [:username] } })
	end

end
