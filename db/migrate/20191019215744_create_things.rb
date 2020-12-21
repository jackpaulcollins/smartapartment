class CreateThings < ActiveRecord::Migration[6.0]
  def change
    create_table :things do |t|
      t.string :name, null: false
      t.integer :quantity, null: false
      t.string :priority, null: false

      t.timestamps
    end
  end
end
