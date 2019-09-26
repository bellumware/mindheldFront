import Vue from 'vue'

export async function saveStudentAction(context, student) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {
      root: true
    })
    console.log(student)
    const response = await Vue.axios({
      method: 'POST',
      url: '/students/save',
      data: student,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
    if (response.data.status === 'ok') {
      console.log(response.data.result)
      resultOperation.messageType = "success"
      resultOperation.message = "Estudiante creado correctamente"
      resultOperation.visible = true
    } else if (response.data.status === 'error') {
      resultOperation.messageType = "error"
      resultOperation.message = "Error al crear el estudiante, verifique los datos o si ya existe."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on create student ${e}`)
    resultOperation.messageType = "error"
    resultOperation.message = "Error al crear el estudiante, verifique los datos o si ya existe."
    resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return resultOperation
  }
}

export async function editStudentAction(context, student) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {
      root: true
    })
    console.log(`token: ${context.rootState.auth.token}`)
    const response = await Vue.axios({
      method: 'POST',
      url: '/students/edit',
      data: student,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`
      }
    })
    console.log(response)
    if (response.data.status === 'ok') {
      console.log(response.data.result)
      resultOperation.messageType = "success"
      resultOperation.message = "Estudiante actualizado correctamente"
      resultOperation.visible = true
    } else if (response.data.status === 'error') {
      resultOperation.messageType = "error"
      resultOperation.message = "Error al actualizar el estudiante, verifique los datos."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on edit student ${e}`)
    resultOperation.messageType = "error"
    resultOperation.message = "Error al actualizar el profesor, verifique los datos."
    resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return resultOperation
  }
}

export async function deleteStudentAction(context, student) {
  try {
    var resultOperation = {
      messageType: null,
      message: null,
      visible: false
    }
    context.commit('setLoading', true, {
      root: true
    })
    console.log(`token: ${context.rootState.auth.token}`)
    const response = await Vue.axios({
      method: 'POST',
      url: '/students/delete',
      data: student,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`
      }
    })
    console.log(response)
    if (response.data.status === 'ok') {
      console.log(response.data.result)
      resultOperation.messageType = "success"
      resultOperation.message = "Estudiante eliminado correctamente"
      resultOperation.visible = true
    } else if (response.data.status === 'error') {
      resultOperation.messageType = "error"
      resultOperation.message = "Error al eliminar el estudiante, verifique los datos."
      resultOperation.visible = true
    }
  } catch (e) {
    console.log(`error on delete student ${e}`)
    resultOperation.messageType = "error"
    resultOperation.message = "Error al eliminar el estudiante, verifique los datos."
    resultOperation.visible = true
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return resultOperation
  }
}

export async function getStudentsPublic(context) {
  try {
    var result = []
    context.commit('setLoading', true, {
      root: true
    })
    console.log(`token: ${context.rootState.auth.token}`)
    var response = await Vue.axios({
      method: 'GET',
      url: '/students/public/getAll/basic'
    })
    result = response.data.result
  } catch (e) {
    console.log(`error on fetching teachers ${e}`)

  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return result
  }
}

export async function getStudents(context) {
  try {
    var result = []
    context.commit('setLoading', true, {
      root: true
    })
    console.log(`token: ${context.rootState.auth.token}`)
    var response = await Vue.axios({
      method: 'GET',
      url: '/students/getAll/basic',
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`
      }
    })
    console.log(response)
    result = response.data.result
  } catch (e) {
    console.log(`error on fetching teachers ${e}`)

  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    console.log('log desde el action')
    console.log(result)
    return result
  }
}

export async function getStudent(context, studentId) {
  try {
    var result = []
    context.commit('setLoading', true, {
      root: true
    })
    console.log(`token: ${context.rootState.auth.token}`)
    var response = await Vue.axios({
      method: 'GET',
      url: `/students/getStudent/${studentId}`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`
      }
    })
    console.log(response)
    result = response.data.result
  } catch (e) {
    console.log(`error on fetching teachers ${e}`)

  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    console.log('log desde el action obtener estudiante')
    console.log(result)
    return result
  }
}
