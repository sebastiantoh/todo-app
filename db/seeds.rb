# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(
    title: "Learn to bake a cake", 
    description: "Find recipes online and purchase necessary ingredients and equipment.",
    tag_list: ["Personal", "baking"])

# no due date
Task.create(
    title: "Grocery Shopping: ingredients for a simple vanilla cake", 
    description: "Unsalted Butter
Canola Oil (substitutable with vegetable oil)
Sugar
Salt
Eggs (at least 4 required)
Vanilla Extract
All-Purpose Flour
Baking Powder
Buttermilk",
    tag_list: ["Personal", "baking", "shopping"]).toggle!(:completed)

# overdue, but completed
Task.create(
    title: "Academic Declaration", 
    description: "Declare using EduRec portal. 
Must complete at least 24 hours before Module Registration Exercise.
Opens from 29 December 2019.",
    tag_list: ["School", "Important"],
    due_date: "2019-12-30T12:00:00+08:00").toggle!(:completed)

Task.create(
    title: "Module Registration", 
    description: "Register using EduRec portal",
    tag_list: ["School", "Important"],
    due_date: "2020-01-03T12:00:00+08:00")

# multiple tags
Task.create(
    title: "Module Planning", 
    description: "Research on possible modules to take for the coming semester.

Possible Modules:
  - CS2040S
  - CS2100
  - MA1521
  - IS1103
  - some random GE",
    tag_list: ["School", "Important"],
    due_date: "2020-01-02T12:00:00+08:00")

# overdue task, but completed
Task.create(
    title: "CVWO Mid-Assignment Writeup", 
    description: "Include: basic use cases and execution plan",
    tag_list: ["School"],
    due_date: "2019-12-30T23:59:59+08:00").toggle!(:completed)

Task.create(
    title: "CVWO Assignment Writeup", 
    description: "Include: accomplishments as well as a short user manual",
    tag_list: ["School", "Important"],
    due_date: "2020-01-25T23:59:59+08:00")

# overdue, but not completed. should show indication that task is overdue.
Task.create(
    title: "Schedule Dentist Appointment", 
    description: "For routine scaling and polishing",
    tag_list: ["Personal", "Recurring"],
    due_date: "2019-12-05T23:59:59+08:00")


Task.create(
    title: "Prepare for the new school term", 
    description: "Read ahead for modules",
    tag_list: ["School"])


# multi-line description. each line should be rendered on a new line.
Task.create(
    title: "Lorem ipsum dolor sit amet", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet dapibus dolor.
Nulla sit amet nisl ut diam condimentum cursus. Pellentesque id justo eu lorem rhoncus bibendum ut et massa. 
Proin dignissim elit et turpis porttitor porttitor. Donec rhoncus ligula et tempor pretium. 
Aenean porta ante convallis efficitur ullamcorper.",
    tag_list: ["Random", "Recurring"])

Task.create(
    title: "Donec dignissim porta malesuada ", 
    description: "Morbi congue nisi dui, et viverra nulla porttitor nec. Sed condimentum sit amet ante.",
    tag_list: [])

# below tasks should not appear due to invalid input
Task.create(
    title: "Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. Mauris maximus. ", 
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
    title: "Non-empty title, with empty description and tags", 
    description: "",
    tag_list: [])

Task.create(
    title: "", 
    description: "Non-empty description, with empty title and tags",
    tag_list: [])

Task.create(
    title: "", 
    description: "",
    tag_list: ["non-empty tag"])

Task.create(
    title: "testing empty description", 
    description: "",
    tag_list: ["non-empty tag"])


Task.create(
    title: "", 
    description: "testing empty title",
    tag_list: ["non-empty tag"])
