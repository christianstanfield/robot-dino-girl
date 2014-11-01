class LevelReportsController < ApplicationController

  def create
    score = params[:score].to_i
    @user = current_user
    @user.game_reports.last.level_reports.create!(points: score)
    render :nothing => true
  end

end
