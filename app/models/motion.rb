class Motion < ActiveRecord::Base
	belongs_to :sleep
		def self.total_on(time, sleep_id)
    	# where("dateTime(created_at) = ?",date).sum(:total_price)
		where(["created_at >= ? AND created_at <= ? AND sleep_id = ?", time,time + 10.minutes, sleep_id]).count
	end
end
