
export default function (app) {
  var state = app.state
  var store = app.store
  var views = app.views

  init()

  return store

  function paint () {
    app.render(views)
  }

  function saveAction (action, scope) {
    return function (data) {
      var update = action(state[scope], store[scope], data)

      if (typeof update === 'object') {
        state[scope] = update
        paint()
      }
    }
  }

  function saveView (view) {
    return function (data) {
      return view(state, store, views, data)
    }
  }

  function init () {
    var scope

    for (scope in store) {
      var actions = store[scope]

      console.log(state, scope)

      state[scope] = {}
      store[scope] = {}

      for (var action in actions) {
        store[scope][action] = saveAction(actions[action], scope)
      }
    }

    for (scope in views) {
      views[scope] = saveView(views[scope])
    }

    paint()
  }
}
