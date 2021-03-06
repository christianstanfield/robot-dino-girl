class LevelReportsController < ApplicationController

  def create
    score = params[:score].to_i
    @user = current_user
    @game_report = @user.game_reports.last
    @game_report.level_reports.create!(points: score)
    # html_game_points = render partial: 'games/show_game_stats', formats: :html
    html_game_points = "<li>"
    html_game_points += "<h2>Game #{current_user.game_reports.count}</h2>"
    @game_report.level_reports.each_with_index do |level_report, index|
      html_game_points += "<ul><li>Points: #{level_report.points}</li></ul>"
    end
    html_game_points += "</li>"
    html_top_ten = ""
    User.get_top_ten.each do |username, score|
      html_top_ten += "<li>#{username}: #{score}</li>"
    end
    render json: {highScore: @user.get_high_score,
                  topTenScores: html_top_ten,
                  htmlString: html_game_points}
  end

  def twoplayer
    if params[:winner] == '1'
      @game_report = current_user.game_reports.last
      @game_report.level_reports.create(opponent: "You won")
      render partial: "games/show_game_stats", formats: :html
    else
      @game_report = current_user.game_reports.last
      @game_report.level_reports.create(opponent: "You lost")
      render partial: "games/show_game_stats", formats: :html
    end
  end

end
