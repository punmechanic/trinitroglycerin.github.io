---
title: 'Optimistic UI: how to make React reducers be less suck'
date: 2021-07-28 11:00:00
tags:
- javascript
- react
---

Verbosity is not necessarily a bad thing, but sometimes it can feel annoying to write the same boilerplate over and over again. The following is a common pattern in React (or Redux) reducers, and is very verbose:

```tsx
const [{count, isActive, error}, dispatch] = useReducer(
  (state: StateType, action: ActionType) => {
    switch (action.type) {
     case "LOADING":
      return {
        ...state,
        isActive: true,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        count: action.payload,
        isActive: false,
        error: null,
      };
      case "SET_FAILURE":
        return {
          ...state,
          isActive: false,
          error: action.payload,
        };
      default:
        return state;
    }
  },
  initialState
);

const set = (amount: number) => {
  dispatch({ type: "LOADING" });
  updateCounterOnServer(amount)
    .then(() => {
      dispatch({ type: "SET_SUCCESS", payload: amount });
    })
    .catch((error) => {
      dispatch({ type: "SET_FAILURE", payload: error });
    });
};
```

It does the job, but aside from being verbose, it also has the problem that the user has to wait for a full round-trip to the server to confirm the transaction and also has you explicitly managing loading states. This is fine for mission-critical updates — such as when you’re submitting a destructive change.

Sometimes, though, you have either lower-sensitivity updates where you don’t care if the task doesn’t succeed or you have some other way of notifying the user and making it clear to them something is pending — such as how Discord displays pending messages:

![Displays a message being sent by Dan in Discord that is still in the pending state. Messages in the pending state are visibly distinguished from messages in the sent state by having a slightly darker colour to them](/images/discord-badge.png)

If that’s the case, the following pattern might be more appropriate:

```tsx
const { data, pending, error } = useReducer((state, action) => {
  if (‘payload’ in action) {
    return { data: action.payload, pending: action.pending };
  }

  if (‘error’ in action) {
    return { …state, error };
  }

  return state;
}, initialState);

const set = async (amount) => {
  dispatch({ payload: amount, pending: true });
  try {
    dispatch({ payload: await updateCounterOnServer(amount), pending: false });
  } catch (e) {
    dispatch({ error: e });
  }
}
```

Note the changes:
* We don’t use a ‘type’ field but instead alter reducer behavior based on fields being present — The reason to use a type field in Redux is because every reducer in Redux receives every action, but in React reducers they’re narrowly scoped to a single component, usually
* We immediately update the content with the potential value and mark it as pending, which can be displayed to the user.
* It’s much more concise

This provides snappier feedback to a user and also plays nicer with React’s transition API.

The key principle is that we assume the asynchronous operation is going to succeed and let the user have some indication of what it might result in while still letting them use the application. 9 times out of 10, our remote API server is going to work, so why are we always writing our state logic as if they will fail?

You **should** still handle failures in the UI, of course, but unless the pending task is a blocker to the user, there are nicer ways to structure your code than having boolean isLoading flags everywhere and waiting until the operation resolves before showing the user something more interesting than a spinner.