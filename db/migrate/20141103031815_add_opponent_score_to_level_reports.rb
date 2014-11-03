class AddOpponentScoreToLevelReports < ActiveRecord::Migration
  def change
    add_column :level_reports, :opponent_score, :integer
  end
end
