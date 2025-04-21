class Users::BaseController < ApplicationController
  layout "user"
  before_action :authenticate_user!  # ensure user is logged in
end
