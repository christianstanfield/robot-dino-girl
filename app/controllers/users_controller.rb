class UsersController < ApplicationController
  def create
    puts "CREATE"
    user = User.create(user_params)
    if user.valid?
      redirect_to root_url, :notice => "Signed up!"
    else
      @user = user
      render "sessions/new"
    end
  end

  def show
    if current_user
      @game_reports = current_user.game_reports
      @level_reports = current_user.level_reports
      @high_score = current_user.get_high_score
    else
      redirect_to sessions_new_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email)
  end
end
