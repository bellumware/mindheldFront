import Vue from 'vue'

export async function getGamesEnabled (context) {
  try {
    var result = []
    context.commit('setLoading', true, {root: true})
    const response = await Vue.axios({
      method: 'GET',
      url: '/games/public/enabledgames'
    })
    result = response.data.result
  } catch (e) {
    console.log(`error en getGamesEnabled ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    return result
  }
}

export async function getAllGames (context) {
  try {
    var result = []
    context.commit('setLoading', true, {root: true})
    const response = await Vue.axios({
      method: 'GET',
      url: '/games/getAll',
      headers: {
          'authorization': `Mindheld ${context.rootState.auth.token}`,
        }
    })
    result = response.data.result
  } catch (e) {
    console.log(`error en getAllGames ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    return result
  }
}

export async function editGame (context, game) {
  try {
    var result = null
    context.commit('setLoading', true, {root: true})
    const response = await Vue.axios({
      method: 'POST',
      url: '/games/edit',
      data: game,
      headers: {
          'authorization': `Mindheld ${context.rootState.auth.token}`,
        }
    })
    result = response.data.result
  } catch (e) {
    console.log(`error en startPlaying ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    return result
  }
}

export async function startPlaying (context, gameHistory) {
  try {
    var result = null
    context.commit('setLoading', true, {root: true})
    const response = await Vue.axios({
      method: 'POST',
      url: '/games/public/startPlaying',
      data: gameHistory
    })
    result = response.data.result
  } catch (e) {
    console.log(`error en startPlaying ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    return result
  }
}

export async function endPlaying (context, gameHistory) {
  try {
    var result = null
    context.commit('setLoading', true, {root: true})
    const response = await Vue.axios({
      method: 'POST',
      url: '/games/public/endPlaying',
      data: gameHistory
    })
    result = response.data.result
  } catch (e) {
    console.log(`error en endPlaying ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    return result
  }
}
