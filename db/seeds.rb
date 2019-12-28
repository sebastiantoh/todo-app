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
    tag_list: ["Urgent", "School"],
    due_date: "2019-12-30T23:59:59+08:00")

Task.create(
    title: "CVWO Assignment Writeup", 
    description: "Include: accomplishments as well as a short user manual. By 25 Jan",
    tag_list: ["Urgent", "School"],
    due_date: "2020-01-25T23:59:59+08:00")

Task.create(
    title: "Schedule Dentist Appointment", 
    description: "For routine scaling and polishing",
    tag_list: ["Urgent", "Personal"]).toggle!(:completed)

Task.create(
    title: "Mauris maximus.", 
    description: "orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis nulla nibh, eget varius elit porttitor sed. Ut sit amet. ",
    tag_list: ["eaten","dangerous","log","without","lucky","experience",
    "passage","monkey","military","rocky","torn","human",
    "remain","flag","statement","news","attempt","bottom",
    "means","dried","select","race","wet","rich",
    "settlers","basic","break","hill","pitch","our",
    "third","become","pair","pupil","manner","lips",
    "air","rubber","shout","community","rubbed","foreign"])

Task.create(
    title: "SHOULD NOT APPEAR! Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. ", 
    description: "orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis nulla nibh, eget varius elit porttitor sed. Ut sit amet. ",
    tag_list: ["eaten","dangerous","log","without","lucky","experience",
    "passage","monkey","military","rocky","torn","human",
    "remain","flag","statement","news","attempt","bottom",
    "means","dried","select","race","wet","rich",
    "settlers","basic","break","hill","pitch","our",
    "third","become","pair","pupil","manner","lips",
    "air","rubber","shout","community","rubbed","foreign"])

Task.create(
    title: "", 
    description: "",
    tag_list: [])

Task.create(
    title: "SHOULD NOT APPEAR! Non-empty title, with empty description and tags", 
    description: "",
    tag_list: [])

Task.create(
    title: "", 
    description: "SHOULD NOT APPEAR! Non-empty description, with empty title and tags",
    tag_list: [])

Task.create(
    title: "", 
    description: "",
    tag_list: ["SHOULD NOT APPEAR!", "non-empty tag"])

Task.create(
    title: "testing empty tags", 
    description: "testing empty tags",
    tag_list: [])

Task.create(
    title: "SHOULD NOT APPEAR! testing empty description", 
    description: "",
    tag_list: ["non-empty tag"])


Task.create(
    title: "", 
    description: "SHOULD NOT APPEAR! testing empty title",
    tag_list: ["non-empty tag"])