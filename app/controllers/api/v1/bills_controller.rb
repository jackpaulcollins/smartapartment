class Api::V1::BillsController < ApplicationController
  def index
    bill = Bill.all.order(created_at: :desc)
    render json: bill
  end

  def create
    bill = Bill.create!(bill_params)
    if bill
      render json: bill
    else
      render json: bill.errors
    end
  end

  def show
    if bill
      render json: bill
    else
      render json: bill.errors
    end
  end

  def destroy
    bill&.destroy
    render json: { message: 'Bill deleted!' }
  end

  private

  def bill_params
    params.permit(:name, :amount, :due, :owner, :link)
  end

  def bill
    @bill ||= Bill.find(params[:id])
  end
end
