class Api::V1::ThingsController < ApplicationController
  def index
    thing = Thing.all.order(created_at: :asc)
    render json: thing
  end

  def create
    thing = Thing.create!(thing_params)
    if thing
      render json: thing
    else
      render json: thing.errors
    end
  end

  def show
    thing = Thing.find(params[:id])
    if thing
      render json: thing
    else
      render json: thing.errors
    end
  end

  def destroy
    thing&.destroy
    render json: { message: 'Thing to buy has been bought!' }
  end

  private 

  def thing_params
    params.permit(:name, :quantity, :priority)
  end

  def thing
    @thing ||= Thing.find(params[:id])
  end
end
