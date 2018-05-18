import Component from '@ember/component';
import { equal } from 'ember-awesome-macros';
import raw from 'ember-macro-helpers/raw';


export default Component.extend({
  action: null,
  isDocumentUpload: equal('action.type', raw('document-upload')),
  isDataEntry: equal('action.type', raw('data-entry'))
});
