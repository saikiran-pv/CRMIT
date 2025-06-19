class AddContactIdToOpportunity < ActiveRecord::Migration[8.0]
  def change
    add_column :opportunities, :contact_id, :integer
  end
end
