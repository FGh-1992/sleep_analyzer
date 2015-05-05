json.array!(@profiles) do |profile|
  json.extract! profile, :id, :name, :lastname, :birthdate, :telephone, :gender, :user_id
  json.url profile_url(profile, format: :json)
end
