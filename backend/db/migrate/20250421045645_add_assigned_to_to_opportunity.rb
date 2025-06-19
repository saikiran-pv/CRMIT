class AddAssignedToToOpportunity < ActiveRecord::Migration[8.0]
  def change
    add_column :opportunities, :assigned_to, :integer
  end
end
