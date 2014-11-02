class GameReportsController < ApplicationController

  def create
    @user = current_user
    @game_report = @user.game_reports.create!
    # render :nothing => true
    # content_type :json
    @high_score  = @user.get_high_score
    # {high_score: }.to_json
    render json: @high_score
  end
end
