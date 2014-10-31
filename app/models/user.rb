class User < ActiveRecord::Base
  validates :username, presence: true
  validates :username, uniqueness: true
  validates_format_of :email, :with => /\S+@\S+\.\S+/
  validates :password, presence: true
  has_secure_password

  # attr_reader :username, :password
  has_many :game_reports
  has_many :level_reports, through: :game_reports
end
