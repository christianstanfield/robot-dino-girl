class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.integer :key_left
      t.integer :key_right
      t.integer :key_up
      t.integer :key_down
      t.integer :key_jump
      t.integer :key_shoot
      t.integer :key_switch
      t.integer :key_pause
      t.timestamps
    end
  end
end
