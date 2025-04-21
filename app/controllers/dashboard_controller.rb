class DashboardController < Users::BaseController
  def index
    # Fetch data that should be displayed on the dashboard
    @customer_count = Customer.count
    @contact_count = Contact.count
    # You can also fetch other user-specific data here
  end
end
