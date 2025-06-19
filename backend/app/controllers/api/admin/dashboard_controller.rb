module Api
  module Admin
    class DashboardController < BaseController
      def index
        @users = User.all
        render json: @users
      end
    end
  end
end
