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
  this.route('signup');
});

export default Router;
