class CreateBills < ActiveRecord::Migration[6.0]
  def change
    create_table :bills do |t|
      t.string :name, null: false
      t.integer :amount, null: false
      t.string :due, null: false
      t.string :owner, null: false
      t.string :link, default: 'https://www.xfinity.com'

      t.timestamps
    end
  end
end
