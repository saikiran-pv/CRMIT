class Contact < ApplicationRecord
  belongs_to :customer
  has_and_belongs_to_many :users
  has_many :opportunities, dependent: :nullify
end
