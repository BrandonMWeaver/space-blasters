class Player < ApplicationRecord

	has_secure_password

	validates :username, length: { minimum: 3, maximum: 18 }
	validates :password, length: { minimum: 5 }
	
end
