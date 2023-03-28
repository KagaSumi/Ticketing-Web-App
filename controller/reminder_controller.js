let database = require("../database");

let remindersController = {
  list: (req, res) => {
    console.log()
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let array = database.cindy.reminders;
    let index = array.indexOf(searchResult);
    let currentReminder = searchResult;
    currentReminder.title = req.body.title;
    currentReminder.description = req.body.description;
    currentReminder.completed = Boolean(req.body.completed);
    database.cindy.reminders[index] = currentReminder
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let array = database.cindy.reminders;
    let index = array.indexOf(searchResult);
    array.pop(index)
    res.render("reminder/", { reminders: database.cindy.reminders });
  },
};

module.exports = remindersController;
