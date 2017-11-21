export default function (app) {
  var state = {}
  var stores = {}
  var views = {}

  function saveAction (action, state, actions) {
    return function (data) {
      var update = action(state, actions, data)

      if (typeof update === 'object') {
        state[store] = update
        app.render(views)
      }
    }
  }

  function saveView (view, state, stores, views) {
    return function (data) {
      return view(state, stores, views, data)
    }
  }

  for (var store in app.stores) {
    var actions = app.stores[store]

    state[store] = {}
    stores[store] = {}

    for (var action in actions) {
      stores[store][action] = saveAction(actions[action], state[store], stores[store])
    }
  }

  for (var view in app.views) {
    views[view] = saveView(app.views[view], state, stores, views)
  }

  app.render(views)

  return stores
}
