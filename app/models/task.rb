class Task < ActiveRecord::Base
  belongs_to :user
  attr_accessible :description, :due_date, :priority, :title, :status, :user_id
  scope :pending, -> {where(status: 'pending')}
  scope :completed, -> {where(status: 'completed')}

end
