class Tacobell < ApplicationRecord
  validates :owner, presence: true
  validates :lastday, presence: true
end
