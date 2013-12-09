// Generated by EmberScript 0.0.7
var get$ = Ember.get;
Em.onLoad('Ember.Application', function (application) {
  application.initializer({
    name: 'ember-auth',
    initialize: function (container, app) {
      app.register('auth:main', get$(app, 'Auth') || get$(Em, 'Auth'), { singleton: true });
      app.inject('route', 'auth', 'auth:main');
      app.inject('controller', 'auth', 'auth:main');
      return app.inject('view', 'auth', 'auth:main');
    }
  });
  return application.initializer({
    name: 'ember-auth-load',
    after: 'ember-auth',
    initialize: function (container, app) {
      return container.lookup('auth:main');
    }
  });
});// Generated by EmberScript 0.0.7
void function () {
  var $;
  var get$ = Ember.get;
  var set$ = Ember.set;
  $ = jQuery;
  set$(Em, 'Auth', Ember.Object.extend({
    _defaults: {},
    _config: function (namespace, defaults) {
      if (null != defaults) {
        return function (accum$) {
          var k, v;
          for (k in defaults) {
            v = defaults[k];
            get$(this, '_defaults')[namespace] || (get$(this, '_defaults')[namespace] = {});
            accum$.push(get$(this, '_defaults')[namespace][k] = v);
          }
          return accum$;
        }.call(this, []);
      } else {
        return $.extend(true, {}, get$(this, '_defaults')[namespace], this.get(namespace));
      }
    },
    _handlers: {
      signInSuccess: [],
      signInError: [],
      signOutSuccess: [],
      signOutError: [],
      sendSuccess: [],
      sendError: []
    },
    module: Ember.computed(function () {
      var moduleName, modules;
      modules = {};
      for (var i$ = 0, length$ = get$(this, 'modules').length; i$ < length$; ++i$) {
        moduleName = get$(this, 'modules')[i$];
        modules[moduleName] = get$(this, 'container').lookup('authModule:' + moduleName);
      }
      return modules;
    }).property('modules.@each'),
    _request: Ember.computed(function () {
      return get$(this, 'container').lookup('authRequest:' + get$(this, 'request'));
    }).property('request'),
    _response: Ember.computed(function () {
      return get$(this, 'container').lookup('authResponse:' + get$(this, 'response'));
    }).property('response'),
    _strategy: Ember.computed(function () {
      return get$(this, 'container').lookup('authStrategy:' + get$(this, 'strategy'));
    }).property('strategy'),
    _session: Ember.computed(function () {
      return get$(this, 'container').lookup('authSession:' + get$(this, 'session'));
    }).property('session'),
    signIn: function (url, opts) {
      var this$;
      if (typeof opts === 'undefined') {
        opts = url;
        url = get$(this, '_request').resolveUrl(get$(this, 'signInEndPoint'));
      } else {
        url = get$(this, '_request').resolveUrl(url);
      }
      opts || (opts = {});
      return new (get$(get$(Em, 'RSVP'), 'Promise'))((this$ = this, function (resolve, reject) {
        var this$1, this$2;
        return get$(this$, '_request').signIn(url, get$(this$, '_strategy').serialize(opts)).then((this$1 = this$, function (response) {
          var data, handler, promises;
          data = get$(this$1, '_response').canonicalize(response);
          promises = [];
          promises.push(get$(this$1, '_strategy').deserialize(data));
          promises.push(get$(this$1, '_session').start(data));
          for (var i$ = 0, length$ = get$(get$(this$1, '_handlers'), 'signInSuccess').length; i$ < length$; ++i$) {
            handler = get$(get$(this$1, '_handlers'), 'signInSuccess')[i$];
            promises.push(handler(data));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return resolve(data);
          }).fail(function () {
            return reject(data);
          });
        })).fail((this$2 = this$, function (response) {
          var data, handler, promises;
          data = get$(this$2, '_response').canonicalize(response);
          promises = [];
          promises.push(get$(this$2, '_strategy').deserialize(data));
          promises.push(get$(this$2, '_session').end(data));
          for (var i$ = 0, length$ = get$(get$(this$2, '_handlers'), 'signInError').length; i$ < length$; ++i$) {
            handler = get$(get$(this$2, '_handlers'), 'signInError')[i$];
            promises.push(handler(data));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return reject(data);
          }).fail(function () {
            return reject(data);
          });
        }));
      }));
    },
    signOut: function (url, opts) {
      var this$;
      if (typeof opts === 'undefined') {
        opts = url;
        url = get$(this, '_request').resolveUrl(get$(this, 'signOutEndPoint'));
      } else {
        url = get$(this, '_request').resolveUrl(url);
      }
      opts || (opts = {});
      return new (get$(get$(Em, 'RSVP'), 'Promise'))((this$ = this, function (resolve, reject) {
        var this$1, this$2;
        return get$(this$, '_request').signOut(url, get$(this$, '_strategy').serialize(opts)).then((this$1 = this$, function (response) {
          var data, handler, promises;
          data = get$(this$1, '_response').canonicalize(response);
          promises = [];
          promises.push(get$(this$1, '_strategy').deserialize(data));
          promises.push(get$(this$1, '_session').end(data));
          for (var i$ = 0, length$ = get$(get$(this$1, '_handlers'), 'signOutSuccess').length; i$ < length$; ++i$) {
            handler = get$(get$(this$1, '_handlers'), 'signOutSuccess')[i$];
            promises.push(handler(data));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return resolve(data);
          }).fail(function () {
            return reject(data);
          });
        })).fail((this$2 = this$, function (response) {
          var data, handler, promises;
          data = get$(this$2, '_response').canonicalize(response);
          promises = [];
          for (var i$ = 0, length$ = get$(get$(this$2, '_handlers'), 'signOutError').length; i$ < length$; ++i$) {
            handler = get$(get$(this$2, '_handlers'), 'signOutError')[i$];
            promises.push(handler(data));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return reject(data);
          }).fail(function () {
            return reject(data);
          });
        }));
      }));
    },
    send: function (url, opts) {
      var this$;
      if (typeof opts === 'undefined') {
        opts = url;
        url = get$(this, '_request').resolveUrl('');
      } else {
        url = get$(this, '_request').resolveUrl(url);
      }
      opts || (opts = {});
      return new (get$(get$(Em, 'RSVP'), 'Promise'))((this$ = this, function (resolve, reject) {
        var this$1, this$2;
        return get$(this$, '_request').send(url, get$(this$, '_strategy').serialize(opts)).then((this$1 = this$, function (response) {
          var handler, promises;
          promises = [];
          for (var i$ = 0, length$ = get$(get$(this$1, '_handlers'), 'sendSuccess').length; i$ < length$; ++i$) {
            handler = get$(get$(this$1, '_handlers'), 'sendSuccess')[i$];
            promises.push(handler(response));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return resolve(response);
          }).fail(function () {
            return reject(response);
          });
        })).fail((this$2 = this$, function (response) {
          var handler, promises;
          promises = [];
          for (var i$ = 0, length$ = get$(get$(this$2, '_handlers'), 'sendError').length; i$ < length$; ++i$) {
            handler = get$(get$(this$2, '_handlers'), 'sendError')[i$];
            promises.push(handler(response));
          }
          return get$(Em, 'RSVP').all(promises).then(function () {
            return reject(response);
          }).fail(function () {
            return reject(response);
          });
        }));
      }));
    },
    createSession: function (data) {
      var this$;
      return new (get$(get$(Em, 'RSVP'), 'Promise'))((this$ = this, function (resolve, reject) {
        var handler, promises;
        if (typeof data === 'string')
          data = get$(this$, '_response').canonicalize(data);
        promises = [];
        promises.push(get$(this$, '_strategy').deserialize(data));
        promises.push(get$(this$, '_session').start(data));
        for (var i$ = 0, length$ = get$(get$(this$, '_handlers'), 'signInSuccess').length; i$ < length$; ++i$) {
          handler = get$(get$(this$, '_handlers'), 'signInSuccess')[i$];
          promises.push(handler(data));
        }
        return get$(Em, 'RSVP').all(promises).then(function () {
          return resolve(data);
        }).fail(function () {
          return reject(data);
        });
      }));
    },
    destroySession: function (data) {
      var this$;
      if (null == data)
        data = {};
      return new (get$(get$(Em, 'RSVP'), 'Promise'))((this$ = this, function (resolve, reject) {
        var handler, promises;
        if (typeof data === 'string')
          data = get$(this$, '_response').canonicalize(data);
        promises = [];
        promises.push(get$(this$, '_strategy').deserialize(data));
        promises.push(get$(this$, '_session').end(data));
        for (var i$ = 0, length$ = get$(get$(this$, '_handlers'), 'signOutSuccess').length; i$ < length$; ++i$) {
          handler = get$(get$(this$, '_handlers'), 'signOutSuccess')[i$];
          promises.push(handler(data));
        }
        return get$(Em, 'RSVP').all(promises).then(function () {
          return resolve(data);
        }).fail(function () {
          return reject(data);
        });
      }));
    },
    addHandler: function (type, handler) {
      var msg;
      msg = 'Handler type unrecognized; you passed in `' + type + '`';
      Em.assert(msg, null != get$(this, '_handlers')[type]);
      msg = 'Handler must be a function';
      Em.assert(msg, typeof handler === 'function');
      return get$(this, '_handlers')[type].pushObject(handler);
    },
    removeHandler: function (type, handler) {
      var msg;
      msg = 'Handler type unrecognized; you passed in `' + type + '`';
      Em.assert(msg, null != get$(this, '_handlers')[type]);
      msg = 'Handler must be a function or omitted for removing all handlers';
      Em.assert(msg, typeof handler === 'function' || typeof handler === 'undefined');
      if (null != handler) {
        return get$(this, '_handlers')[type].removeObject(handler);
      } else {
        return get$(this, '_handlers')[type] = [];
      }
    },
    _ensurePromise: function (ret) {
      if (typeof get$(ret, 'then') === 'function') {
        return ret;
      } else {
        return new (get$(get$(Em, 'RSVP'), 'resolve'))(ret);
      }
    }
  }));
}.call(this);// Generated by EmberScript 0.0.7
void function () {
  var mustImplement;
  var get$ = Ember.get;
  var set$ = Ember.set;
  mustImplement = function (method) {
    return function () {
      throw new (get$(Em, 'Error'))('Your request adapter ' + this.toString() + ' must implement the required method `' + method + '`');
    };
  };
  set$(get$(Em, 'Auth'), 'AuthRequest', Ember.Object.extend({
    signIn: mustImplement('signIn'),
    signOut: mustImplement('signOut'),
    send: mustImplement('send'),
    resolveUrl: function (path) {
      var base;
      base = get$(get$(this, 'auth'), 'baseUrl');
      if (base && base[get$(base, 'length') - 1] === '/')
        base = base.substr(0, get$(base, 'length') - 1);
      if ((null != path ? path[0] : void 0) === '/')
        path = path.substr(1, get$(path, 'length'));
      return [
        base,
        path
      ].join('/');
    }
  }));
}.call(this);// Generated by EmberScript 0.0.7
void function () {
  var mustImplement;
  var get$ = Ember.get;
  var set$ = Ember.set;
  mustImplement = function (method) {
    return function () {
      throw new (get$(Em, 'Error'))('Your response adapter ' + this.toString() + ' must implement the required method `' + method + '`');
    };
  };
  set$(get$(Em, 'Auth'), 'AuthResponse', Ember.Object.extend({ canonicalize: mustImplement('canonicalize') }));
}.call(this);// Generated by EmberScript 0.0.7
void function () {
  var mustImplement;
  var get$ = Ember.get;
  var set$ = Ember.set;
  mustImplement = function (method) {
    return function () {
      throw new (get$(Em, 'Error'))('Your strategy adapter ' + this.toString() + ' must implement the required method `' + method + '`');
    };
  };
  set$(get$(Em, 'Auth'), 'AuthStrategy', Ember.Object.extend({
    serialize: mustImplement('serialize'),
    deserialize: mustImplement('deserialize')
  }));
}.call(this);// Generated by EmberScript 0.0.7
void function () {
  var mustImplement;
  var get$ = Ember.get;
  var set$ = Ember.set;
  mustImplement = function (method) {
    return function () {
      throw new (get$(Em, 'Error'))('Your session adapter ' + this.toString() + ' must implement the required method `' + method + '`');
    };
  };
  set$(get$(Em, 'Auth'), 'AuthSession', Ember.Object.extend({
    init: function () {
      get$(this, 'auth').reopen({
        signedIn: get$(Em, 'computed').alias('_session.signedIn'),
        userId: get$(Em, 'computed').alias('_session.userId'),
        startTime: get$(Em, 'computed').alias('_session.startTime'),
        endTime: get$(Em, 'computed').alias('_session.endTime')
      });
      get$(this, 'auth').addHandler('signInSuccess', get$(this, 'start'));
      return get$(this, 'auth').addHandler('signOutSuccess', get$(this, 'end'));
    },
    signedIn: false,
    userId: null,
    startTime: null,
    endTime: null,
    start: function () {
      set$(this, 'signedIn', true);
      set$(this, 'startTime', new Date);
      return set$(this, 'endTime', null);
    },
    end: function () {
      set$(this, 'signedIn', false);
      set$(this, 'userId', null);
      set$(this, 'startTime', null);
      return set$(this, 'endTime', new Date);
    },
    retrieve: mustImplement('retrieve'),
    store: mustImplement('store'),
    remove: mustImplement('remove')
  }));
}.call(this);// Generated by EmberScript 0.0.7
var get$ = Ember.get;
var set$ = Ember.set;
get$(Em, 'Auth').reopen({
  response: 'json',
  request: 'jquery',
  strategy: 'token',
  session: 'localStorage',
  tokenLocation: 'authHeader',
  tokenHeaderKey: 'OAuth',
  modules: [],
  signInEndPoint: '/oauth/authorize',
  signOutEndPoint: '/sign-out',
  rememberable: {
    tokenKey: 'access_token',
    autoRecall: true
  },
  authRedirectable: { route: 'sign_in' },
  actionRedirectable: {
    signInRoute: 'market',
    signOutRoute: 'landing'
  }
});
set$(get$(Em, 'Auth'), 'ApplicationRoute', get$(Em, 'Route').extend({
  renderTemplate: function () {
    return this.render('application');
  },
  init: function () {
    var accessToken;
    accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      console.log('fetched the accessToken');
      return get$(this, 'auth').createSession(JSON.stringify({ access_token: accessToken }));
    }
  },
  actions: {
    signOut: function () {
      var accessToken;
      accessToken = localStorage.getItem('access_token');
      get$(this, 'auth').destroySession(JSON.stringify({ access_token: accessToken }));
      localStorage.removeItem('access_token');
      return localStorage.removeItem('ember-auth-rememberable');
    }
  }
}));
set$(get$(Em, 'Auth'), 'AuthenticatedRoute', get$(Em, 'Route').extend({
  authRedirectable: true,
  beforeModel: function () {
    if (!get$(this, 'auth').get('signedIn')) {
      this.transitionTo('landing');
      return false;
    }
  }
}));
set$(get$(Em, 'Auth'), 'UnauthenticatedRoute', get$(Em, 'Route').extend({
  beforeModel: function () {
    if (get$(this, 'auth').get('signedIn'))
      return this.transitionTo('market/items');
  }
}));
set$(get$(Em, 'Auth'), 'SignInController', get$(Em, 'Controller').extend({
  username: null,
  password: null,
  error: null,
  actions: {
    signIn: function () {
      var clientId, password, this$, this$1, username;
      username = this.get('username');
      password = this.get('password');
      clientId = get$(TreggEditor, 'clientId');
      get$(this, 'auth').signIn({
        data: {
          client_id: clientId,
          username: username,
          password: password,
          grant_type: 'password'
        }
      });
      get$(this, 'auth').addHandler('signInSuccess', (this$ = this, function () {
        var accessToken;
        this$.set('username', '');
        this$.set('password', '');
        accessToken = get$(this$, 'auth').get('authToken');
        if (accessToken) {
          get$(this$, 'auth').createSession(JSON.stringify({ access_token: accessToken }));
          return localStorage.setItem('access_token', accessToken);
        }
      }));
      return get$(this, 'auth').addHandler('signInError', (this$1 = this, function () {
        var response;
        response = get$(this$1, 'auth').get('response');
        return this$1.set('error', get$(response, 'error_description'));
      }));
    }
  }
}));
set$(get$(Em, 'Auth'), 'SignUpController', get$(Em, 'Controller').extend({
  username: null,
  password: null,
  confirmPassword: null,
  error: null,
  actions: {
    signUp: function () {
      var clientId, confirmPassword, data, password, signUpUrl, this$, this$1, username;
      username = this.get('username');
      password = this.get('password');
      confirmPassword = this.get('confirmPassword');
      clientId = get$(TreggEditor, 'clientId');
      signUpUrl = get$(TreggEditor, 'baseApiUrl') + '/sign-up';
      data = {
        username: username,
        password: password,
        confirm_password: confirmPassword,
        client_id: clientId
      };
      return Ember.$.post(signUpUrl, data, (this$ = this, function (response) {
        var accessToken;
        accessToken = get$(response, 'access_token');
        if (accessToken) {
          get$(this$, 'auth').createSession(JSON.stringify({ access_token: accessToken }));
          localStorage.setItem('access_token', accessToken);
          return this$.transitionToRoute('sign_in');
        }
      })).fail((this$1 = this, function (jqxhr, textStatus, error) {
        var errs;
        errs = JSON.parse(get$(jqxhr, 'responseText'));
        return this$1.set('error', get$(errs, 'error'));
      }));
    }
  }
}));