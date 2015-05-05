class Sleep < ActiveRecord::Base
	belongs_to :user
	has_many :motions

end
