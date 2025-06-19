class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :database_authenticatable, :registerable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_and_belongs_to_many :customers
  has_and_belongs_to_many :contacts
  has_many :leads, foreign_key: "assigned_to", class_name: "Lead"
  has_many :opportunities, foreign_key: :assigned_to, dependent: :nullify
end
