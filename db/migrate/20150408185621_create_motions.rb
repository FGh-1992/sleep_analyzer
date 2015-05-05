class CreateMotions < ActiveRecord::Migration
  def change
    create_table :motions do |t|
      t.integer :sleep_id
      t.datetime :motion_time

      t.timestamps null: false
    end
  end
end
