# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Wine.create({position: "1", winemaker: "Cyril Gautheron", vintage: "2012", variety: "Chablis", region: "Burgundy"})
Wine.create({position: "2", winemaker: "Cinco Manos", vintage: "2016", variety: "Chardonnay", region: "Chile"})
Wine.create({position: "3", winemaker: "Cinco Manos", vintage: "2016", variety: "Chardonnay", region: "Chile"})
Wine.create({position: "4", winemaker: "La Fleur d'Or", vintage: "2013", variety: "Sauternes", region: "Bordeaux"})
Wine.create({position: "5", winemaker: "Lucas & Lewellen", vintage: "2017", variety: "Rose", region: "Santa Barbara"})