class Lead < ApplicationRecord
    has_one :opportunity
    belongs_to :assigned_user, class_name: "User", foreign_key: "assigned_to", optional: true
end

