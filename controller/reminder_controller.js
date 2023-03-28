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
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let array = req.user.reminders;
    let index = array.indexOf(searchResult);
    let currentReminder = searchResult;
    currentReminder.title = req.body.title;
    currentReminder.description = req.body.description;
    currentReminder.completed = Boolean(req.body.completed);
    req.user.reminders[index] = currentReminder
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let array = req.user.reminders;
    let index = array.indexOf(searchResult);
    array.pop(index)
    res.render("reminder/", { reminders: req.user.reminders });
  },
};

module.exports = remindersController;
