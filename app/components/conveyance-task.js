import Component from '@ember/component';
import { computed } from '@ember/object';
import { conditional, or } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  'data-test-conveyance-task': true,
  currentUser: service(),

  editingNotes: false,

  isSaveRunning: or('toggleComplete.isRunning', 'saveNotes.isRunning'),

  status: conditional('task.complete', raw('complete'), raw('outstanding')),

  notesAreUnedited: computed('task.notes', function() {
    let { task } = this;
    return !task.changedAttributes().notes;
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
      this.task.rollbackAttributes();
      this.send('toggleIsEditing');
    }
  }
});
