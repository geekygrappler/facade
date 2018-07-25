import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  /**
   *  We are adding a solicitor to the conveyance during sign up this on the
   * 'server' side so we need to return solicitors for ember
   */
  include: ['solicitor'] // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
});