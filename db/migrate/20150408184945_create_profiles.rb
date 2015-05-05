class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :lastname
      t.datetime :birthdate
      t.string :telephone
      t.string :gender
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
