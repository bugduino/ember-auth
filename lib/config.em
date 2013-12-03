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
  modules: []

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

Em.ApplicationRoute = Em.Route.extend
  renderTemplate: ->
    @render('application')
  init: ->
    accessToken = localStorage.getItem("access_token")
    if accessToken
      console.log "fetched the accessToken"
      @auth.createSession JSON.stringify(access_token: accessToken)

Em.AuthenticatedRoute = Em.Route.extend
  authRedirectable: true
  beforeModel: ->
    if !@auth.get "signedIn"
      @transitionTo('landing')
      false
  actions:
    signOut: ->
      #delete session
      accessToken = localStorage.getItem("access_token")
      @auth.destroySession JSON.stringify(access_token: accessToken)
      localStorage.removeItem "access_token"
      localStorage.removeItem "ember-auth-rememberable"

Em.UnauthenticatedRoute = Em.Route.extend
  beforeModel: ->
    if @auth.get "signedIn"
      @transitionTo "market"

Em.SignInController = Em.Controller.extend
  # Used for form field binding
  username: null
  password: null
  # Store error from server
  error: null
  actions:
    signIn: ->
      username = @get("username")
      password = @get("password")
      clientId = TreggEditor.clientId
      # Use Ember-Auth for the login
      @auth.signIn 
        data:
          #TODO: add a valid app id
          client_id: clientId
          username: username
          password: password
          grant_type: "password"
      # subscribe to the `signInSuccess` event and
      # then create session manually
      @auth.addHandler "signInSuccess", =>
        accessToken = @auth.get("authToken")
        if accessToken
          # Manually create the session
          @auth.createSession JSON.stringify(access_token: accessToken)
          # Manually save the token
          localStorage.setItem "access_token", accessToken

      @auth.addHandler "signInError", =>
        #TODO: promt error to user
        response = @auth.get("response")
        @set "error", response.error_description

Em.SignUpController = Em.Controller.extend
  # Used for form field binding
  username: null
  password: null
  confirmPassword: null
  
  # Store server error
  error: null
  actions:
    signUp: ->
      username = @get("username")
      password = @get("password")
      confirmPassword = @get("confirmPassword")
      clientId = TreggEditor.clientId
      signUpUrl = TreggEditor.baseApiUrl + "/sign-up"
      data =
        username: username
        password: password
        confirm_password: confirmPassword
        client_id: clientId
      # make the request
      Ember.$.post(signUpUrl, data, (response) =>
      # Get access_token from server response
        accessToken = response.access_token
        if accessToken
      # Manually create the session
          @auth.createSession JSON.stringify(access_token: accessToken)
      # Manually save the token
          localStorage.setItem "access_token", accessToken
      # Redirect user to home
          @transitionToRoute "sign_in"
      ).fail (jqxhr, textStatus, error) =>
        errs = JSON.parse(jqxhr.responseText)
        #TODO: promt error to
        @set "error", errs.error
