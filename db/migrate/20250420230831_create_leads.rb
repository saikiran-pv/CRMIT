class CreateLeads < ActiveRecord::Migration[8.0]
  def change
    create_table :leads do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :status
      t.string :source
      t.text :notes
      t.integer :assigned_to

      t.timestamps
    end
  end
end
