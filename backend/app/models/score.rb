class Score < ApplicationRecord

	belongs_to :player
	
	scope :top_ten, -> { order(number: :desc).take(10) }

end
