class Opportunity < ApplicationRecord
  belongs_to :customer, optional: true
  belongs_to :lead, optional: true
  belongs_to :contact, optional: true
  belongs_to :assigned_user, class_name: 'User', foreign_key: :assigned_to, optional: true
end
