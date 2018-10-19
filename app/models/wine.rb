class Wine < ApplicationRecord
    validates :winemaker, presence: true
    validates :vintage, presence: true
    validates :variety, presence: true
    validates :region, presence: true
    validates :position, presence: true
    validates :position, numericality: { only_integer: true, greater_than: 0, less_than: 97 }
end
