class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def after_sign_out_path(users)
  	new_user_session
  end

end
