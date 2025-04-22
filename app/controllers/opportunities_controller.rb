class OpportunitiesController < Users::BaseController
  before_action :authenticate_user!
  before_action :set_opportunity, only: [:show, :edit, :update, :destroy]

  def index
    @opportunities = current_user.opportunities
  end

  def show
  end

  def new
    @opportunity = Opportunity.new
  end

  def create
    @opportunity = Opportunity.new(opportunity_params)
    @opportunity.assigned_to = current_user.id

    if @opportunity.save
      redirect_to @opportunity, notice: 'Opportunity was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @opportunity.update(opportunity_params)
      redirect_to @opportunity, notice: 'Opportunity was successfully updated.'
    else
      render :edit
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
