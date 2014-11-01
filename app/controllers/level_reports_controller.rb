class LevelReportsController < ApplicationController

  def create
    score = params[:score].to_i
    @user = current_user
    @game_report = @user.game_reports.last
    @game_report.level_reports.create!(points: score)
    render partial: 'games/show_game_stats', formats: :html
  end

end
