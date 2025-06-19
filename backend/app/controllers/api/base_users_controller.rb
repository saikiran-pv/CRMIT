module Api
  class BaseUsersController < ApplicationController
    before_action :authenticate_user!  # ensure user is logged in

    def render_current_user
      render json: current_user
    end
  end
end


