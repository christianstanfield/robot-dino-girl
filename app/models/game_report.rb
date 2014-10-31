class GameReport < ActiveRecord::Base
  belongs_to :user
  has_many :level_reports
end
