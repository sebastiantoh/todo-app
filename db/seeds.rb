# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

grocery = Task.create(
    title: "Grocery Shopping", 
    description: "Buy 1 carton of milk and some eggs",
    tag_list: ["Personal"])

Task.create(
    title: "CVWO Mid-Assignment Writeup", 
    description: "Include: basic use cases and execution plan. By 30 Dec",
    tag_list: ["Urgent", "School"])

Task.create(
    title: "CVWO Assignment Writeup", 
    description: "Include: accomplishments as well as a short user manual. By 25 Jan",
    tag_list: ["Urgent", "School"])

Task.create(
    title: "Schedule Dentist Appointment", 
    description: "For routine scaling and polishing",
    tag_list: ["Urgent", "Personal"])

Task.create(
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris maximus. ", 
    description: "orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis nulla nibh, eget varius elit porttitor sed. Ut sit amet. ",
    tag_list: ["eaten","dangerous","log","without","lucky","experience",
    "passage","monkey","military","rocky","torn","human",
    "remain","flag","statement","news","attempt","bottom",
    "means","dried","select","race","wet","rich",
    "settlers","basic","break","hill","pitch","our",
    "third","become","pair","pupil","manner","lips",
    "air","rubber","shout","community","rubbed","foreign"])