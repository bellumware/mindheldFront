import Vue from 'vue'

export async function saveTeacherAction (context, teacher) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {root: true})
    console.log(`token: ${context.rootState.auth.token}`)
    const response = await Vue.axios({
      method: 'POST',
      url: '/teacher/create',
      data: teacher,
      headers: {'authorization': `Mindheld ${context.rootState.auth.token}`}
    })
    console.log(response)
    if(response.data.status === 'ok'){
        console.log(response.data.result)
        resultOperation.messageType = "success"
        resultOperation.message = "Profesor creado correctamente"
        resultOperation.visible = true
    }else if(response.data.status === 'error'){
      resultOperation.messageType = "error"
      resultOperation.message = "Error al crear el profesor, verifique los datos o si ya existe."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on create teacher ${e}`)
      resultOperation.messageType = "error"
      resultOperation.message = "Error al crear el profesor, verifique los datos o si ya existe."
      resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {root: true})
    return resultOperation
  }
}

export async function editTeacherAction (context, teacher) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {root: true})
    console.log(`token: ${context.rootState.auth.token}`)
    const response = await Vue.axios({
      method: 'POST',
      url: '/teacher/edit',
      data: teacher,
      headers: {'authorization': `Mindheld ${context.rootState.auth.token}`}
    })
    console.log(response)
    if(response.data.status === 'ok'){
        console.log(response.data.result)
        resultOperation.messageType = "success"
        resultOperation.message = "Profesor actualizado correctamente"
        resultOperation.visible = true
    }else if(response.data.status === 'error'){
      resultOperation.messageType = "error"
      resultOperation.message = "Error al actualizar el profesor, verifique los datos."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on create teacher ${e}`)
      resultOperation.messageType = "error"
      resultOperation.message = "Error al actualizar el profesor, verifique los datos."
      resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {root: true})
    return resultOperation
  }
}

export async function deleteTeacherAction (context, teacher) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {root: true})
    console.log(`token: ${context.rootState.auth.token}`)
    const response = await Vue.axios({
      method: 'POST',
      url: '/teacher/delete',
      data: teacher,
      headers: {'authorization': `Mindheld ${context.rootState.auth.token}`}
    })
    console.log(response)
    if(response.data.status === 'ok'){
        console.log(response.data.result)
        resultOperation.messageType = "success"
        resultOperation.message = "Profesor eliminado correctamente"
        resultOperation.visible = true
    }else if(response.data.status === 'error'){
      resultOperation.messageType = "error"
      resultOperation.message = "Error al eliminar el profesor, verifique los datos."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on create teacher ${e}`)
      resultOperation.messageType = "error"
      resultOperation.message = "Error al eliminar el profesor, verifique los datos."
      resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {root: true})
    return resultOperation
  }
}

export async function getTeachers (context) {
  try {
    var result = []
    context.commit('setLoading', true, {root: true})
    console.log(`token: ${context.rootState.auth.token}`)
    var response = await Vue.axios({
      method: 'GET',
      url: '/teacher/getAll',
      headers: {'authorization': `Mindheld ${context.rootState.auth.token}`}
    })
    console.log(response)
    result = response.data.result
  } catch (e) {
    console.log(`error on fetching teachers ${e}`)

  } finally {
    context.commit('setLoading', false, {root: true})
    console.log('log desde el action')
    console.log(result)
    return result
  }
}
