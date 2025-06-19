
module Api
  module Admin
    class UsersController < BaseController
      def show
        @user = current_user
      end
    end
  end
end
