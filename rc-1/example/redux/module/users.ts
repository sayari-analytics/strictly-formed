import { Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { catchError, delay, mergeMap, startWith } from 'rxjs/operators'
import { Id, clearComponent, setComponent, getComponent } from '../../../src'
import { SignupFormState } from '../../components/signup-form'
import { UserFormState } from '../../components/user-form'
import { Action, State } from '../store'

/**
 * types
 */
export type UsersState = { [id: string]: { name: string; vip: boolean } }

export type CreateUserAction = {
  type: typeof CREATE_USER
  id: Id<SignupFormState>
  name: string
  vip: boolean
}

export type CreateUserActionComplete = {
  type: typeof CREATE_USER_COMPLETE
  user_id: string
  name: string
  vip: boolean
}

export type UpdateUserAction = {
  type: typeof UPDATE_USER
  id: Id<UserFormState>
  name: string
  vip: boolean
}

export type UpdateUserActionComplete = {
  type: typeof UPDATE_USER_COMPLETE
  user_id: string
  name: string
  vip: boolean
}

export type UsersAction =
  | CreateUserAction
  | CreateUserActionComplete
  | UpdateUserAction
  | UpdateUserActionComplete

/**
 * selectors
 */
export const getUser = (state: State, id: string) => state.users[id]

/**
 * constants
 */
export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_COMPLETE = 'CREATE_USER_COMPLETE'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_COMPLETE = 'UPDATE_USER_COMPLETE'

/**
 * actions
 */
export const createUser = (
  id: Id<SignupFormState>,
  name: string,
  vip: boolean
): CreateUserAction => ({ type: CREATE_USER, id, name, vip })

export const createUserComplete = (
  user_id: string,
  name: string,
  vip: boolean
): CreateUserActionComplete => ({
  type: CREATE_USER_COMPLETE,
  user_id,
  name,
  vip,
})

export const updateUser = (
  id: Id<UserFormState>,
  name: string,
  vip: boolean
): UpdateUserAction => ({ type: UPDATE_USER, id, name, vip })

export const updateUserComplete = (
  user_id: string,
  name: string,
  vip: boolean
): UpdateUserActionComplete => ({
  type: UPDATE_USER_COMPLETE,
  user_id,
  name,
  vip,
})

/**
 * reducer
 */
export const reducer = (state: UsersState, action: Action) => {
  if (action.type === CREATE_USER_COMPLETE) {
    return {
      ...state.users,
      [action.user_id]: { name: action.name, vip: action.vip },
    }
  }

  return state
}

/**
 * epic
 */
const api = (
  _url: string,
  _method: string,
  _body: { name: string; vip: boolean }
) => of({ user_id: '123' }).pipe(delay(2000))

export const createUserEpic: Epic<Action, Action, State> = (action$, state$) =>
  action$.pipe(
    ofType<Action, 'CREATE_USER', CreateUserAction>(CREATE_USER),
    mergeMap(({ id, name, vip }) => {
      // can read component state programatically from store, if needed
      const _componentState = getComponent(state$.value, id)

      return api('/signup', 'POST', { name, vip }).pipe(
        mergeMap(({ user_id }) => {
          // on success, add user to redux, show a success message, and clear form after 3 sec
          return of(clearComponent(id)).pipe(
            delay(3000),
            startWith(
              createUserComplete(user_id, name, vip),
              setComponent(id, {
                name,
                vip: false,
                status: 'complete',
                message: `Created user ${name}`,
              })
            )
          )
        }),
        // start by setting form to pending
        startWith(
          setComponent(id, { name, vip, status: 'pending', message: undefined })
        ),
        catchError(() => {
          // on error, show an error message and clear form after 3 sec
          return of(clearComponent(id)).pipe(
            delay(3000),
            startWith(
              setComponent(id, {
                vip,
                name,
                status: 'error',
                message: `Error creating user`,
              })
            )
          )
        })
      )
    })
  )
