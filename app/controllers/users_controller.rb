class UsersController < ApplicationController
  def create
    puts "CREATE"
    user = User.new(user_params)
    puts user.valid?
    puts user.errors
    if user.valid?
      user.save
      session[:user_id] = user.id
      render :"users/show"
      # redirect_to "/users/#{user.id}"
    else
      @user = user
      redirect_to root_url
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
