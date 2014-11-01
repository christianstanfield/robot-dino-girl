class GameReportsController < ApplicationController

  def create
    @user = current_user
    @game_report = @user.game_reports.create!
    render :nothing => true
  end
end
