import Vue from 'vue'

export async function signIn (context, user) {
  try {
    context.commit('setLoading', true, {root: true})
    console.log(user.username + " " + user.password)
    const response = await Vue.axios({
      method: 'POST',
      url: '/token/generate-token',
      data: user
    })
    console.log(response)
    if(response.data.status === 'ok'){
        console.log(response.data.result.token)
        console.log(response.data.result.role)
        context.commit('setUser', user)
        context.commit('setToken', response.data.result.token)
        context.commit('setRole', response.data.result.role)
        context.commit('setPersonData', response.data.result.personData)
        context.commit('isLogged', true)


    }
  } catch (e) {
    console.log(`error en singIn ${e}`)
    context.commit('authError', 'Usuario o contraseña incorrectos.')
  } finally {
    context.commit('setLoading', false, {root: true})
  }
}
