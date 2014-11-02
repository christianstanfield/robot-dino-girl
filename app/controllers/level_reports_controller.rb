class LevelReportsController < ApplicationController

  def create
    score = params[:score].to_i
    @user = current_user
    @game_report = @user.game_reports.last
    @game_report.level_reports.create!(points: score)
    # s = render partial: 'games/show_game_stats', formats: :html
    s = "<li>"
    s += "<h2>Game #{current_user.game_reports.count}</h2>"
    @game_report.level_reports.each_with_index do |level_report, index|
      s += "<ul><li>Points: #{level_report.points}</li></ul>"
    end
    s += "</li>"
    render json: {highScore: @user.get_high_score, htmlString: s}
  end

end
