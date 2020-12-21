class Api::V1::UsersController < ApplicationController
  #before_action :authenticate_user!

  def index
    user = User.all
  end

  def jack
    user = User.where(first_name: "Jack")
    render json: user 
  end

  def pete
    user = User.where(first_name: "Pete")
    render json: user 
  end

  def update
    user = User.find_by(first_name: params[:personToReset])
    user.update(last_day_having_tacobell: Time.now)
    puts user.last_day_having_tacobell
    render json: user 
  end

  def temp_method
    jack = User.find_by(first_name: "Jack")
    jack.update(last_day_having_tacobell: "10-01-2019")
  end
end
