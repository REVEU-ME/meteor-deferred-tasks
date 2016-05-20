# DEFERRED TASKS
## Schedule one-off tasks to run in the future

## The Basics

### Register a task definition
    DeferredTasks.registerAction('my_cool_task', function(params) {
      console.log(params);
    });

### Schedule a task
    // Scheduled 'my_cool_task' with a reference ID of 'refId' in about 15 seconds.
    DeferredTasks.schedule('my_cool_task', 'refId', {logThis: 'yeah'}, Date.now() + 15000);

### Cancel a task
    // Cancels the instance of 'my_cool_task' with a reference ID of 'refID'
    DeferredTasks.cancel({action: 'my_cool_task', refId: 'refId'});
