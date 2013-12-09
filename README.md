ember-auth-fungo-mod
==========

[![Build Status](https://secure.travis-ci.org/heartsentwined/ember-auth.png)](http://travis-ci.org/heartsentwined/ember-auth)
[![Gem Version](https://badge.fury.io/rb/ember-auth-source.png)](http://badge.fury.io/rb/ember-auth-source)
[![NPM version](https://badge.fury.io/js/ember-auth.png)](http://badge.fury.io/js/ember-auth)

Given settings
=============
<pre>
<code>
  Em.Auth.reopen
    response: 'json'
    request:  'jquery'
    strategy: 'token'
    session:  'localStorage'
    tokenLocation: "authHeader"
    tokenHeaderKey: "OAuth"
    modules: []
    signInEndPoint: '/oauth/authorize'
    signOutEndPoint: '/sign-out'
    rememberable: 
      tokenKey: "access_token"
      autoRecall: true
    authRedirectable:
      route: "sign_in"
    actionRedirectable:
      signInRoute: "market"
      signOutRoute: "sign_in"
</code>
</pre>

Getting Started
=============

These build of ember-auth automatically generate some routes and controller for you
`Em.Auth.ApplicationRoute`, `Em.Auth.AuthenticatedRoute`, `Em.Auth.UnauthenticatedRoute
`, `Em.Auth.SignInController`, `Em.Auth.SignUpController`

In order to get all working you need to do the following step:

in your `Gemfile` add the following gem
<pre>
<code>
  gem 'ember-auth-rails' 
  gem 'ember-auth-source', git: 'git://github.com/giulyquinto/ember-auth.git', branch: 'feature/custom_auth'
  gem 'ember-auth-request-jquery-rails' 
  gem 'ember-auth-request-jquery-source'
  gem 'ember-auth-response-json-rails' 
  gem 'ember-auth-response-json-source' # semver
  gem 'ember-auth-strategy-token-rails' 
  gem 'ember-auth-strategy-token-source' # semver
  gem 'ember-auth-session-local_storage-rails' 
  gem 'ember-auth-session-local_storage-source'
  gem 'ember-auth-module-ember_data-rails' 
  gem 'ember-auth-module-ember_data-source'
  gem 'ember-auth-module-rememberable-rails' 
  gem 'ember-auth-module-rememberable-source'
  gem 'ember-auth-module-auth_redirectable-rails' 
  gem 'ember-auth-module-auth_redirectable-source'
  gem 'ember-auth-module-action_redirectable-rails' 
  gem 'ember-auth-module-action_redirectable-source'
</code>
</pre>

in `application.coffee`
<pre>
<code>
  #= require ember-auth-request-jquery
  #= require ember-auth-response-json
  #= require ember-auth-strategy-token
  #= require ember-auth-session-local-storage
  #= require ember-auth-module-ember-data
  #= require ember-auth-module-rememberable
  #= require ember-auth-module-auth-redirectable
  #= require ember-auth-module-action-redirectable
  App = Ember.Application.create(
    baseApiUrl: "your base api url"
    clientId: "your client id"
  )
  App.Auth = Ember.Auth.extend(
    tokenKey: "access_token"
    baseUrl: App.baseApiUrl
    modules: ["emberData", "remeberable", "authRedirectable", "actionRedirectable"]
  )
</code>
</pre>

if you need you can switch the `emberData` module with `emberModel` but remember that you also need to change the gem loaded according to ember-auth specification [ember-auth-docs](http://ember-auth.herokuapp.com/docs)

It's important that you explicitly define ann applicationController in this way
<pre><code>App.ApplicationController = Ember.Controller.extend()
</code></pre>

You need to create routes and controllers files in your application in order to extend the given ones.
Create `application_route.coffee` file and extend the given route
<pre><code>App.ApplicationRoute = Ember.Auth.ApplicationRoute.extend()</code></pre>

Create `authenticated_route.coffee`
<pre><code>App.AuthenticatedRoute = Ember.Auth.AuthenticatedRoute.extend()</code></pre>

Create `unauthenticated_route.coffee`
<pre><code>App.UnauthenticatedRoute = Ember.Auth.UnauthenticatedRoute.extend()</code></pre>

Create `sign_in_controller.coffee`
<pre><code>App.SignInController = Ember.Auth.SignInController.extend()</code></pre>

Create `sign_up_controller.coffee`
<pre><code>App.SignUpController = Ember.Auth.SignUpController.extend()</code></pre>

You will also need to create `sign_in_route.coffee`, `sign_up_route.coffee`, `landing_route.coffee` which extends the `Em.Auth.UnauthenticatedRoute` and the relative templates.

Contributing
============

Building distribution js files
------------------------------

`rake dist`. Or `bundle exec rake dist` if you are not using
[RVM](http://rvm.io/), or are not otherwise scoping the bundle.

License
=======

MIT
