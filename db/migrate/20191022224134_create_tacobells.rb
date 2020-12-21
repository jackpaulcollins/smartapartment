class CreateTacobells < ActiveRecord::Migration[6.0]
  def change
    create_table :tacobells do |t|
      t.string :owner
      t.string :lastday

      t.timestamps
    end
  end
end
