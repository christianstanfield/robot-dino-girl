class CreateGameReports < ActiveRecord::Migration
  def change
    create_table :game_reports do |t|
      t.belongs_to :user
      t.timestamps
    end
  end
end
