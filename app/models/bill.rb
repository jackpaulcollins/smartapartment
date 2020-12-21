class Bill < ApplicationRecord
  validates :name, presence: true
  validates :amount, presence: true
  validates :due, presence: true
  validates :owner, presence: true
  validates :link, presence: true
end
