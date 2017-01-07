Hanami::Model.migration do
  change do
    add_column :users, :queue_number, Integer, null: false, default: 0
  end
end
