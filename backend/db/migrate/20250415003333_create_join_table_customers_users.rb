class CreateJoinTableCustomersUsers < ActiveRecord::Migration[8.0]
  def change
    create_join_table :customers, :users do |t|
      # t.index [:customer_id, :user_id]
      # t.index [:user_id, :customer_id]
    end
  end
end
