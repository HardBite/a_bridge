class Task < ActiveRecord::Base
  belongs_to :user
  attr_accessible :description, :due_date, :priority, :title, :status, :user_id

  after_initialize :set_up

  validates :title, presence: true
  validates :priority, numericality: {only_integer: true}
  validate :due_date_in_future

  scope :pending, -> {where(status: 'pending')}
  scope :completed, -> {where(status: 'completed')}

  def set_up
    self.priority = 10
  end

  def due_date_in_future
    if self.status == "pending"
      if self.due_date < Date.today
        errors.add(:due_date, "Can't be in the past for pending task")
      end
    end

  end



end
