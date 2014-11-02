class User < ActiveRecord::Base
  validates :username, presence: true
  validates :username, uniqueness: true
  validates_format_of :email, :with => /\S+@\S+\.\S+/
  validates :password_digest, presence: true
  has_secure_password

  has_many :game_reports
  has_many :level_reports, through: :game_reports

  def get_high_score
    high_score = 0
    self.game_reports.each do |game_report|
      points = 0
      game_report.level_reports.each do |level_report|
        points += level_report.points
      end
      high_score = points if points > high_score
    end
    return high_score
  end
end
