class GameReportsController < ApplicationController

  def create
    @user = current_user
    @user.game_reports.create!
    render :nothing => true
  end
end
