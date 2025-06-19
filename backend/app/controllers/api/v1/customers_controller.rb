require "pry"
module Api
  module V1

    class CustomersController < Api::BaseUsersController
      # before_action :authenticate_sales_rep!, only: [:create, :edit, :update]
      # before_action :authenticate_admin!, only: [:destroy]
      
      # Disable CSRF protection for API
      protect_from_forgery with: :null_session

      # or, if you want to disable CSRF entirely for this controller:
      # skip_before_action :verify_authenticity_token


      before_action :set_customer, only: [ :show, :edit, :update, :destroy ]

      def index
        # binding.pry
        @customers = current_user.customers
        render json: @customers
      end

      def show
        @customer = Customer.find(params[:id])
        render json: @customer
      end

      def new
        @customer = Customer.new
      end

      def create
        @customer = Customer.new(customer_params)
       
        if @customer.save
          current_user.customers << @customer
          render json: @customer, status: :created
        else
          render json: { errors: @customer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
      end

      def update
        if @customer.update(customer_params)
          render json: @customer, status: :ok        
        else
          render json: { errors: @customer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @customer.destroy
        redirect_to customers_path, notice: "Customer deleted successfully."
      end

      private

      def set_customer
        @customer = Customer.find(params[:id])
      end

      def customer_params
        params.require(:customer).permit(:name, :email, :phone, :address)
      end
    end
  end
end