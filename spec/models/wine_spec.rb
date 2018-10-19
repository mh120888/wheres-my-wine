require 'rails_helper'

RSpec.describe Wine, type: :model do
  let(:attributes) do
    {
      winemaker: "Robert Mondavi",
      vintage: "2016",
      variety: "Cabernet Sauvignon",
      region: "California",
      position: "1"
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

  it "is invalid when missing a position" do
    attributes.delete(:position)
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when position is not an integer" do
    attributes[:position] = "two"
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when position is outside of the range 1-96 (too low)" do
    attributes[:position] = "0"
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end

  it "is invalid when position is outside of the range 1-96 (too high)" do
    attributes[:position] = "97"
    wine = Wine.new(attributes)

    expect(wine.valid?).to be(false)
  end
end
