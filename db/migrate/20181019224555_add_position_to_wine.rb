class AddPositionToWine < ActiveRecord::Migration[5.2]
  def change
    add_column :wines, :position, :string
  end
end
