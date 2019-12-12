# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(
    title: "Grocery Shopping", 
    description: "Buy 1 carton of milk and some eggs")

Task.create(
    title: "CVWO Mid-Assignment Writeup", 
    description: "Include: basic use cases and execution plan. By 30 Dec")
Task.create(
    title: "CVWO Assignment Writeup", 
    description: "Include: accomplishments as well as a short user manual. By 25 Jan")

Task.create(
    title: "Schedule Dentist Appointment", 
    description: "For routine scaling and polishing")