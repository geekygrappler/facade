import Component from '@ember/component';
import { conditional } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  'data-test-conveyance-task': true,
  currentUser: service(),
  status: conditional('task.complete', raw('complete'), raw('outstanding')),

  toggleComplete: task(function * () {
    let task = this.task;
    let complete = task.complete;
    task.set('complete', !complete);
    yield task.save();
  }).drop(),
});
