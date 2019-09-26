import Vue from 'vue'

export async function getAllNewsApi(context, quantity) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var result = []
    console.log("fetching " + quantity);
    const response = await Vue.axios({
      method: 'GET',
      url: `/news/getAll/${quantity}`,
      headers: {
          'authorization': `Mindheld ${context.rootState.auth.token}`,
        }
    })
    console.log(response)
    if (response.data.status === 'ok') {
      result = response.data.result
    }
  } catch (e) {
    console.log(`error getting news ${e}`)
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return result
  }
}

export async function create(context, _new) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    const response = await Vue.axios({
      method: 'POST',
      url: '/news/create',
      data: _new,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    console.log(response)
    if (response.data.status === 'ok') {
      resultOperation = {
        messageType: 'info',
        message: 'Noticia creada exitosamente',
        visible: true
      }
    }
  } catch (e) {
    console.log(`error getting news ${e}`)
    resultOperation = {
      messageType: 'error',
      message: 'Error al crear la noticia',
      visible: true
    }
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return resultOperation
  }
}
