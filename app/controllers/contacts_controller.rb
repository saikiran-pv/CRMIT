class ContactsController < Users::BaseController
  # before_action :authenticate_sales_rep!, only: [:create, :edit, :update]
  # before_action :authenticate_admin!, only: [:destroy]
  before_action :set_contact_customer, only: [ :show, :edit, :update, :destroy ]
  before_action :set_user, only: [ :index ]

  def index
    @contacts = @user.contacts
  end

  def show
  end

  def new
    @customer = Customer.find(params[:customer_id])
    @contact = @customer.contacts.build
  end

  def create
    @customer = Customer.find(params[:customer_id])
    @contact = @customer.contacts.build(contact_params)
    if @contact.save
      redirect_to @customer, notice: "Contact created successfully."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @contact.update(contact_params)
      redirect_to @customer, notice: "Contact updated successfully."
    else
      render :edit
    end
  end

  def destroy
    @contact.destroy
    redirect_to @customer, notice: "Contact deleted successfully."
  end

  private

  def set_contact_customer
    @customer = Customer.find(params[:customer_id])
    @contact = @customer.contacts.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:first_name, :last_name, :email)
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end
