import fetch from 'isomorphic-fetch'

export const SELECT_TIMESTAMPS = 'SELECT_TIMESTAMPS'

export function selectTimestamps(timestamps) {
  return {
    type: SELECT_TIMESTAMPS,
    timestamps
  }
}

export const REQUEST_DATA = 'REQUEST_DATA'
function requestData (timestamps) {
  return {
    type: REQUEST_DATA,
    timestamps
  }
}

export const RECEIVE_DATA = 'RECEIVE_DATA'
function receiveData (timestamps, json) {
  return {
    type: RECEIVE_DATA,
    timestamps,
    data: json,
    receivedAt: Date.now()
  }
}


export function fetchData(timestamps) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestData(timestamps))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    //return fetch(`https://www.reddit.com/r/reactjs.json`)

    return fetch(process.env.PUBLIC_URL + '/data/Events1.json')
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json => {
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          console.log("!!!!!!!!!!!!!!")
          console.log(timestamps, json)
          dispatch(receiveData(timestamps, json))
        }
      )
  }
}
