export function setUser (state, user){
  state.user = user
  state.isLogged = true
  state.errorMessage = ''
}

export function setToken (state, token){
  state.token = token
}

export function setRole (state, role){
  state.role = role
}

export function setError(state, bool){
    state.error = bool
}

export function logout (state) {
  state.user = null
  state.token = null
  state.isLogged = false
  state.errorMessage = ''
  state.personData = null
  state.role = null
}

export function authError (state, error) {
  state.error = true
  state.errorMessage = error
  state.user = null
  state.isLogged = false
  state.token = null
}

export function setPersonData(state, personData){
  state.personData = personData
}
