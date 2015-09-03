class Task < ActiveRecord::Base
  attr_accessible :description, :due_date, :priority, :title, :status
  scope :pending, -> {where(status: 'pending')}
  scope :completed, -> {where(status: 'completed')}
end
