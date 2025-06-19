# app/controllers/admin/base_controller.rb
module Api
  module Admin
    class BaseController < ApplicationController
      before_action :authenticate_user!
      before_action :require_admin!

      private

      def require_admin!
        unless current_user&.role == "admin"
          redirect_to root_path, alert: "You are not authorized to access admin area."
        end
      end
    end
  end
end

