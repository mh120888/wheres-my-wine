require 'rails_helper'

RSpec.describe Wine, type: :model do
  let(:attributes) do
    {
      winemaker: "Robert Mondavi",
      vintage: "2016",
      variety: "Cabernet Sauvignon",
      region: "California"
    }
  end

  it "is valid with valid attributes" do
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(true)
  end

  it "is invalid when missing a winemaker" do
    attributes.delete(:winemaker)
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when missing a vintage" do
    attributes.delete(:vintage)
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when missing a variety" do
    attributes.delete(:variety)
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when missing a winemaker" do
    attributes.delete(:region)
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end
end
