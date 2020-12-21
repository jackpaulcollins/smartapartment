class Thing < ApplicationRecord
  validates :name, presence: true
  validates :quantity, presence: true
  validates :priority, presence: true
end
