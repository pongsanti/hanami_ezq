Hanami::Model.migration do
  change do
    drop_column :users, :password_salt
  end
end
