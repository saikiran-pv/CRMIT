module Api
  module V1
    class UsersController < Api::BaseUsersController
      
      def me
        render json: current_user
      end
    
      def show
        render_current_user
      end

      # def edit
      #   @user = current_user
      # end

      # def update
      #   @user = current_user
      #   if @user.update(user_params)
      #     redirect_to user_path(@user), notice: "Profile updated successfully!"
      #   else
      #     render :edit
      #   end
      # end

      # private

      # # Strong parameters for user profile update
      # def user_params
      #   params.require(:user).permit(:email, :first_name, :last_name)
      # end
    end
  end
end
