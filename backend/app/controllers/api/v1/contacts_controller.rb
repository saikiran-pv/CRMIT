require "pry"
module Api
  module V1

    class ContactsController < Api::BaseUsersController
      # before_action :authenticate_sales_rep!, only: [:create, :edit, :update]
      # before_action :authenticate_admin!, only: [:destroy]
      before_action :set_contact, only: [ :show, :edit, :update, :destroy ]
      # before_action :set_user, only: [ :index ]
      protect_from_forgery with: :null_session

      def index
        # binding.pry
        @contacts = current_user.contacts
        render json: @contacts
      end

      def show
        @contact = Contact.find(params[:id])
        render json: @contact
      end

      def new
        @customer = Customer.find(params[:customer_id])
        @contact = @customer.contacts.build
      end

      def create
        @customer = Customer.find(params[:customer_id])
        @contact = @customer.contacts.build(contact_params)
        @contact.users << current_user
        if @contact.save
          render json: @contact, notice: "Contact created successfully."
        else
          render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def edit
      end

      def update
        if @contact.update(contact_params)
          render json: @customer, status: :ok   
        else
          render json: { errors: @contact.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @contact.destroy
        redirect_to @customer, notice: "Contact deleted successfully."
      end

      private

      def set_contact
        @contact = Contact.find(params[:id])  
      end

      def contact_params
        params.require(:contact).permit(:first_name, :last_name, :email, :customer_id)
      end

      def set_user
        @user = User.find(params[:user_id])
      end
    end
  end
end