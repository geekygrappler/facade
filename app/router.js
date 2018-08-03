import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('conveyances', function() {
    this.route('show', { path: ':id' });
  });
  this.route('login');
  this.route('signup', function() {
    this.route('buying-or-selling', { path: 'step-1' });
    this.route('postcode', { path: 'step-2' });
    this.route('quote', { path: 'step-3' });
  });
});

export default Router;
