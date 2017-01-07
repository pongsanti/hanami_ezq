Hanami::Model.migration do
  change do
    add_column :users, :ticket_number, Integer, null: false, default: 0    
  end
end
