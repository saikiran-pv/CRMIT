require "pry"
module Api
  module V1

    class LeadsController < Api::BaseUsersController
      protect_from_forgery with: :null_session

      before_action :set_lead, only: [ :show, :edit, :update, :destroy, :convert ]

      def index
        @leads = current_user.leads
        @leads = @leads.where(status: params[:status]) if params[:status].present?
        
        render json: @leads
      end

      def show
        @lead = Lead.find(params[:id])
        render json: @lead
      end

      def new
        @lead = Lead.new
      end

      def create
        puts lead_params
        @lead = Lead.new(lead_params)
        if @lead.save
          render json: @lead, notice: "Lead created successfully."
        else
          render json: { errors: @lead.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
      end

      def update
        if @lead.update(lead_params)
          render json: @lead, notice: "Lead updated successfully."
        else
          render json: { errors: @lead.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @lead.destroy
        redirect_to leads_path, notice: "Lead deleted."
      end

      def convert
        binding.pry
        @opportunity = Opportunity.create(
          title: "Opportunity from #{@lead.name}",
          lead: @lead,
          amount: 0.0,
          stage: "Qualification",
          close_date: Date.today + 30.days,
          customer_id: 1
        )
        render json: @opportunity, notice: "Lead converted to opportunity."
      end

      private

      def set_lead
        @lead = Lead.find(params[:id])
      end

      def lead_params
        params.require(:lead).permit(:name, :email, :phone, :status, :source, :notes, :assigned_to)
      end
    end
  end
end
