class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

 def after_sign_in_path_for(user)
    if !user.profile.blank?
      return authenticated_root_path
    else
      return new_profile_path
    end
  end
  
  def after_sign_up_path_for(user)
    #if !user.profile.blank?
    #  root_path
    #else
      return new_profile_path
    #end
  end

  def after_inactive_sign_up_path_for(user)
    if !user.profile.blank?
      root_path
    else
      new_profile_path
    end
  end
end

