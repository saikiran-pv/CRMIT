class LeadsController < Users::BaseController
    before_action :set_lead, only: [:show, :edit, :update, :destroy, :convert]
  
    def index
      @leads = current_user.leads
    end
  
    def show
    end
  
    def new
      @lead = Lead.new
    end
  
    def create
      @lead = Lead.new(lead_params)
      if @lead.save
        redirect_to @lead, notice: 'Lead created successfully.'
      else
        render :new
      end
    end
  
    def edit
    end
  
    def update
      if @lead.update(lead_params)
        redirect_to @lead, notice: 'Lead updated.'
      else
        render :edit
      end
    end
  
    def destroy
      @lead.destroy
      redirect_to leads_path, notice: 'Lead deleted.'
    end
  
    def convert
      @opportunity = Opportunity.create(
        title: "Opportunity from #{@lead.name}",
        lead: @lead,
        amount: 0.0,
        stage: "Qualification",
        close_date: Date.today + 30.days
      )
      redirect_to @opportunity, notice: 'Lead converted to opportunity.'
    end
  
    private
  
    def set_lead
      @lead = Lead.find(params[:id])
    end
  
    def lead_params
      params.require(:lead).permit(:name, :email, :phone, :status, :source, :notes, :assigned_to)
    end

end
  