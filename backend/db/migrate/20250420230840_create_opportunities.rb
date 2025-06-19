class CreateOpportunities < ActiveRecord::Migration[8.0]
  def change
    create_table :opportunities do |t|
      t.string :title
      t.decimal :amount
      t.string :stage
      t.date :close_date
      t.references :customer, null: false, foreign_key: true
      t.references :lead, null: false, foreign_key: true
      t.text :notes

      t.timestamps
    end
  end
end
