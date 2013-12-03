Em.Auth.reopen
  # [string] (opt) request adapter;
  #   default: 'jquery'
  request:  'jquery'

  # [string] (opt) response adapter;
  #   default: 'json'
  response: 'json'

  # [string] (opt) strategy adapter;
  #   default: 'token'
  strategy: 'token'

  # [string] (opt) session adapter;
  #   default: 'localStorage'
  session:  'localStorage'

  # [array<string>] (opt) list of modules, loaded in order specified;
  #   default: []
  modules: ["remeberable", "authRedirectable", "actionRedirectable"]

  # [string] end point for sign in requests
  signInEndPoint: '/oauth/authorize'

  # [string] end point for sign out requests
  signOutEndPoint: '/sign-out'

  # [string|null] (opt) a different base url for all ember-auth requests
  baseUrl: null

  tokenKey: "access_token"

  tokenLocation: "authHeader"

  tokenHeaderKey: "OAuth"

  rememberable: 
    tokenKey: "access_token"
    autoRecall: true

  authRedirectable:
    route: "sign_in"

  actionRedirectable:
    signInRoute: "market"
    signOutRoute: "sign_in"

Em.ApplicationRoute.create
  renderTemplate: ->
    @render('application')
  init: ->
    accessToken = localStorage.getItem("access_token")
    if accessToken
      console.log "fetched the accessToken"
      @auth.createSession JSON.stringify(access_token: accessToken)