class AddOpponentToLevelReports < ActiveRecord::Migration
  def change
    add_column :level_reports, :opponent, :string
  end
end
