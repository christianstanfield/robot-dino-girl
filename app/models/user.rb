class User < ActiveRecord::Base
  validates :username, presence: true
  validates :username, uniqueness: true
  validates_format_of :email, :with => /\S+@\S+\.\S+/
  validates :password, presence: true
  has_secure_password

  # attr_reader :username, :password
  has_many :game_reports
  has_many :level_reports, through: :game_reports

  def get_high_score
    high_score = 0
    self.game_reports.each do |game_report|
      # game_high_scores = []
      points = 0
      game_report.level_reports.each do |level_report|
        points += level_report.points
      end
      # game_high_scores << points
      high_score = points if points > high_score
    end
    return high_score
  end
end
