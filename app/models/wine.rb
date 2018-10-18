class Wine < ApplicationRecord
    validates :winemaker, presence: true
    validates :vintage, presence: true
    validates :variety, presence: true
    validates :region, presence: true
end
