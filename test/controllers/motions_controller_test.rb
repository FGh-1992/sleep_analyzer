require 'test_helper'

class MotionsControllerTest < ActionController::TestCase
  setup do
    @motion = motions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:motions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create motion" do
    assert_difference('Motion.count') do
      post :create, motion: { motion_time: @motion.motion_time, sleep_id: @motion.sleep_id }
    end

    assert_redirected_to motion_path(assigns(:motion))
  end

  test "should show motion" do
    get :show, id: @motion
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @motion
    assert_response :success
  end

  test "should update motion" do
    patch :update, id: @motion, motion: { motion_time: @motion.motion_time, sleep_id: @motion.sleep_id }
    assert_redirected_to motion_path(assigns(:motion))
  end

  test "should destroy motion" do
    assert_difference('Motion.count', -1) do
      delete :destroy, id: @motion
    end

    assert_redirected_to motions_path
  end
end
