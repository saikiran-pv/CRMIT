module Api
  module V1
    class DashboardController < Api::BaseUsersController
      def index
        # Fetch data that should be displayed on the dashboard
        @customer_count = Customer.count
        @contact_count = Contact.count
        # You can also fetch other user-specific data here
        # 
        render json: {
          message: "Welcome to your dashboard, #{current_user.first_name}!",
          user: {
            email: current_user.email,
            name: current_user.first_name + " " + current_user.last_name
          },
          stats: {
            customer_count: @customer_count,
            contact_count: @contact_count
          }
        }
      end
    end
  end
end


