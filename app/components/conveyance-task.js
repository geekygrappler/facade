import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { conditional, or } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  'data-test-conveyance-task': true,
  currentUser: service(),

  isSolicitor: reads('currentUser.user.isSolicitor'),
  isBuyer: reads('currentUser.user.isBuyer'),

  editingNotes: false,

  isSaveRunning: or('toggleComplete.isRunning', 'saveNotes.isRunning'),

  status: conditional('task.complete', raw('complete'), raw('outstanding')),

  notesAreUnedited: computed('task.hasDirtyAttributes', function() {
    let { task } = this;
    return !task.hasDirtyAttributes;
  }),

  toggleComplete: task(function * () {
    let task = this.task;
    let complete = task.complete;
    task.set('complete', !complete);
    yield task.save();
  }).drop(),

  saveNotes: task(function * () {
    let { task } = this;
    yield task.save();
    this.set('editingNotes', false);
  }).drop(),

  actions: {
    toggleIsEditing() {
      let oldValue = this.editingNotes;
      this.set('editingNotes', !oldValue);
    },
    cancelEditing() {
      // TODO rollbackAttribute('notes) seems to be missing from ED 3.1 check whether it's been depreciated.
      this.task.rollbackAttributes();
      this.send('toggleIsEditing');
    }
  }
});
