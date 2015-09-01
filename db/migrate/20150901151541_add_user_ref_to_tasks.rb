class AddUserRefToTasks < ActiveRecord::Migration
  def change
    change_table :tasks do |t|
      t.belongs_to :user, index:true
      t.string :status
    end
  end
end
