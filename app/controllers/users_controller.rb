class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    puts "CREATE"
    user = User.new(user_params)
    puts user.valid?
    puts user.errors
    if user.valid?
      user.save
      session[:user_id] = user.id
      @game_reports = current_user.game_reports
      @level_reports = current_user.level_reports
      @high_score = current_user.get_high_score
      @top_ten_scores = User.get_top_ten
      render :"users/show"
      # redirect_to "/users/#{user.id}"
    else
      # flash.now.alert = "Invalid email or password!"
      @user = user
      @error = "Invalid email or password confirmation"
      render :new
      # redirect_to root_url#, :notice => "Invalid, try again!"
    end
  end

  def show
    if current_user
      @game_reports = current_user.game_reports
      @level_reports = current_user.level_reports
      @high_score = current_user.get_high_score
      @top_ten_scores = User.get_top_ten
    else
      redirect_to sessions_new_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email)
  end
end
