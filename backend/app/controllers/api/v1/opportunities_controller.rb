require "pry"
module Api
  module V1

    class OpportunitiesController < Api::BaseUsersController
      protect_from_forgery with: :null_session
      before_action :set_opportunity, only: [:show, :edit, :update, :destroy]

      def index
        @opportunities = current_user.opportunities
        render json: @opportunities
      end

      def show
        @opportunity = Opportunity.find(params[:id])
        render json: @opportunity
      end

      def new
        @opportunity = Opportunity.new
      end

      def create
        @opportunity = Opportunity.new(opportunity_params)
        @opportunity.assigned_to = current_user.id

        if @opportunity.save
          render json: @opportunity, notice: 'Opportunity was successfully created.'
        else
          render json: { errors: @opportunity.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
      end

      def update
        if @opportunity.update(opportunity_params)
          render json: @opportunity, notice: 'Opportunity was successfully updated.'
        else
           render json: { errors: @opportunity.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @opportunity.destroy
        redirect_to opportunities_path, notice: 'Opportunity was deleted.'
      end

      private

      def set_opportunity
        @opportunity = Opportunity.find(params[:id])
      end

      def opportunity_params
        params.require(:opportunity).permit(:title, :amount, :stage,:close_date, :customer_id, :lead_id, :assigned_to,  :notes)
      end
      
    end
  end
end
