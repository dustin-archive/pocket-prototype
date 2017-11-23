export default function (app) {
  var _state = {}
  var _store = {}
  var _views = {}

  init()

  return _store

  function paint () {
    app.render(_views)
  }

  function saveAction (action, scope) {
    return function (data) {
      var update = action(_state[scope], _store[scope], data)

      if (typeof update === 'object') {
        _state[scope] = update
        paint()
      }
    }
  }

  function saveView (view) {
    return function (data) {
      return view(_state, _store, _views, data)
    }
  }

  function init () {
    var scope

    for (scope in app.store) {
      var actions = app.store[scope]

      _state[scope] = {}
      _store[scope] = {}

      for (var action in actions) {
        _store[scope][action] = saveAction(actions[action], scope)
      }
    }

    for (scope in app.views) {
      _views[scope] = saveView(app.views[scope])
    }

    paint()
  }
}
