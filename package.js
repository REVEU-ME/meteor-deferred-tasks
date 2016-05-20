Package.describe({
  name: 'unleet:deferred-tasks',
  version: '0.1.2',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  summary: 'Schedule one-off tasks to run in the future'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'mongo',
    'fongandrew:find-and-modify@0.2.1'
  ]);

  api.addFiles([
    'lib/deferred_tasks.js',
  ], ['server']);

  api.export('DeferredTasks');
});
