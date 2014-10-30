class CreateLevelReports < ActiveRecord::Migration
  def change
    create_table :level_reports do |t|
      t.integer :points, default: 0
      t.integer :completion_time, default: 0
      t.integer :enemies_killed, default: 0
      t.integer :orbs_collected, default: 0
      t.integer :relics_collected, default: 0
      t.belongs_to :game_report
      t.timestamps
    end
  end
end
