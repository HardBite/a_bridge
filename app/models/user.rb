class User < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  attr_accessible :email, :first_name, :last_name
end
