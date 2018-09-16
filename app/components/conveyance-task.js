import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { conditional, or, and } from 'ember-awesome-macros';
import { resolve } from 'ember-awesome-macros/promise';
import raw from 'ember-macro-helpers/raw';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  'data-test-conveyance-task': true,
  currentUser: service(),

  isSolicitor: reads('currentUser.user.isSolicitor'),
  isClient: reads('currentUser.user.isClient'),

  editingNotes: false,

  isSaveRunning: or('toggleComplete.isRunning', 'saveNotes.isRunning'),

  status: conditional('task.complete', raw('complete'), raw('outstanding')),

  /**
   * Resolve required because currentActionBelongsToClient is async
   */
  clientAndClientAction: resolve(and('currentUser.user.isClient', 'task.currentActionBelongsToClient')),

  homewardAndHomewardAction: resolve(and('currentUser.user.isSolicitor', 'task.currentActionBelongsToHomeward')),

  isOwner: or('homewardAndHomewardAction', 'clientAndClientAction'),

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
