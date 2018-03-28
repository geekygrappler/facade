import Component from '@ember/component';
import { conditional } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';

export default Component.extend({
  status: conditional('task.complete', raw('complete'), raw('outstanding'))
});
