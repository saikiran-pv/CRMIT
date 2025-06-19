
module Api
  module Admin
    class SettingsController < BaseController
      def show
        @settings = Setting.all
      end
    end
  end
end
