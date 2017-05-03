var DeferredTaskList,
    runDeferredTasks;
var TaskActions = {};

DeferredTasks = {};

DeferredTaskList = new Mongo.Collection('deferred_tasks');

DeferredTasks.registerAction = function(name, action) {
  TaskActions[name] = action;
};

DeferredTasks.schedule = function(action, refId, parameters, schedule) {
  DeferredTaskList.insert({
    action: action,
    refId: refId,
    parameters: parameters,
    schedule: schedule,
    inProgress: false
  });
};

DeferredTasks.cancel = function(task) {
  if (typeof task === 'string') {
    task = {_id: task};
  }

  return DeferredTaskList.remove(task);
};

DeferredTasks.cancelAll = function() {
  DeferredTaskList.remove({});
};

runDeferredTasks = function() {
  // findAndModify will only affect a single document. That's what we want here.
  var result;
  var task = DeferredTaskList.findAndModify({
    query: {
      inProgress: false,
      schedule: { $lte: Date.now() }
    },
    sort: {
      schedule: 1
    },
    update: {
      $set: { inProgress: true }
    }
  });


  if (task && task.action) {
    if (typeof TaskActions[task.action] === 'function') {
      result = TaskActions[task.action](task.parameters);
    }
    else {
      console.log(task.action, 'is not a registered DeferredTasks action. Use DeferredTasks.register to define it.');
      result = false;
    }

    DeferredTaskList.remove(task._id);
  }
  else {
    result = false;
  }

  return result;
};

Meteor.startup(function() {
  Meteor.setInterval(runDeferredTasks, 15000);
});
