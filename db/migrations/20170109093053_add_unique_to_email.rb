Hanami::Model.migration do
  change do
    alter_table(:users) do
      add_index :email, unique: true
    end
  end
end
