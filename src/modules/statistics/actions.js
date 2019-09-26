import Vue from 'vue'

export async function getStudentsCreatedStatistic(context) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var result = null
    var chartValues = {
      labels: [],
      data: []
    }
    const response = await Vue.axios({
      method: 'GET',
      url: `/statistics/studentsCreatedStatistic`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    if (response.data.status === 'ok') {
      var dataResponse = response.data.result
      dataResponse.forEach(function(val) {
        chartValues.labels.push(val.month)
        chartValues.data.push(val.quantity)
      })

      result = {
        series: [{
          name: "Estudiantes",
          data: chartValues.data
        }],
        chart: {
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Estudiantes creados por mes',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: chartValues.labels,
        }
      }


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


export async function getStudentsOrGamesEnabledStatistic(context, method) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var result = null
    var chartValues = {
      labels: [],
      data: []
    }
    const response = await Vue.axios({
      method: 'GET',
      url: `/statistics/${method === 'students'
                          ? 'studentsEnabledStatistic'
                          : 'gamesEnabledStatistic'
                        }`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    if (response.data.status === 'ok') {
      var dataResponse = response.data.result
      dataResponse.forEach(function(val) {
        chartValues.labels.push(val.enabled)
        chartValues.data.push(parseInt(val.quantity, 10))
      })

      result = {
        title: {
          text: `Total ${method === 'students'
                              ? 'Estudiantes'
                              : 'Juegos'
                        }`,
          align: 'left'
        },
        series: chartValues.data,
        labels: chartValues.labels,
        colors: ['#3DE54A', '#FF0000'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Rubik',
                  color: '#dfsda',
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: undefined,
                  offsetY: 16,
                  formatter: function(val) {
                    return val
                  }
                },
                total: {
                  show: true,
                  label: 'Total',
                  color: '#373d3f',
                  formatter: function(w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0)
                  }
                }
              }
            }
          }
        },
      }


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


export async function getGamesStatisticsByStudent(context, studentId) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var result = null
    var chartValues = {
      labels: [],
      data: [],
      data2: [],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8']
    }
    const response = await Vue.axios({
      method: 'GET',
      url: `/statistics/gamesStatistic/${studentId}`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    if (response.data.status === 'ok') {
      var dataResponse = response.data.result
      dataResponse.forEach(function(val) {
        chartValues.labels.push(val.gameName)
        chartValues.data.push(parseInt(val.quantity, 10))
        chartValues.data2.push(parseFloat(val.hoursPlayed))
      })
      result = {
        gamesPLayed: {
          series: [{
            name: 'Ingresos',
            data: chartValues.data,
          }],
          labels: chartValues.labels,
          plotOptions: {
            radar: {
              size: 140,
              polygons: {
                strokeColor: '#e9e9e9',
                fill: {
                  colors: ['#f8f8f8', '#fff']
                }
              }
            }
          },
          title: {
            text: 'Cantidad de veces que ingreso por juego'
          },
          colors: ['#FF4560'],
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#FF4560',
            strokeWidth: 2,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          },
          yaxis: {
            tickAmount: 7,
            labels: {
              formatter: function(val, i) {
                if (i % 2 === 0) {
                  return val
                } else {
                  return ''
                }
              }
            }
          }
        },
        hoursPlayed: {

          series: [{
            name: 'Horas',
            data: chartValues.data2
          }],
          colors: chartValues.colors,
          plotOptions: {
            bar: {
              barHeight: '100%',
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
          title: {
            text: 'Cantidad de horas registradas por juego',
            align: 'center',
          },
          dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
              colors: ['#fff']
            },
            formatter: function(val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },

          xaxis: {
            categories: chartValues.labels,
            /*labels: {
              style: {
                colors: chartValues.colors,
                fontSize: '14px'
              }
            }*/
          },
        }
      }


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


export async function getStudentObservationStatistic(context, studentId) {
  try {
    context.commit('setLoading', true, {
      root: true
    })
    var result = null
    var chartValues = {
      labels: [],
      data: []
    }
    const response = await Vue.axios({
      method: 'GET',
      url: `/statistics/observationStatistic/${studentId}`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    if (response.data.status === 'ok') {
      var dataResponse = response.data.result.observationsPerMonth
      dataResponse.forEach(function(val) {
        chartValues.labels.push(val.month)
        chartValues.data.push(val.quantity)
      })

      result = {
        observationsPerMonth: {
          series: [{
            name: "Observaciones",
            data: chartValues.data
          }],
          chart: {
            height: 350,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Observaciones creadas por mes',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: chartValues.labels,
          }
        },
      }

      chartValues = {
        labels: [],
        data: []
      }
      dataResponse = response.data.result.observationsPerUser
      dataResponse.forEach(function(val) {
        chartValues.labels.push(val.userName)
        chartValues.data.push(parseInt(val.quantity, 10))
      })

      result.observationsPerUser = {
        title: {
          text: `Total observaciones`,
          align: 'left'
        },
        series: chartValues.data,
        labels: chartValues.labels,
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Rubik',
                  color: '#dfsda',
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: undefined,
                  offsetY: 16,
                  formatter: function(val) {
                    return val
                  }
                },
                total: {
                  show: true,
                  label: 'Total',
                  color: '#373d3f',
                  formatter: function(w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0)
                  }
                }
              }
            }
          }
        },
      }

      console.log(result.observationsPerUser);

    }
  } catch (e) {
    console.log(`error getting gamesStatistic ${e}`)
  } finally {
    context.commit('setLoading', false, {
      root: true
    })
    return result
  }
}

export async function getGamesResults(context, studentId){
  try{
    context.commit('setLoading', true, {root: true})
    var result = []
    const response = await Vue.axios({
      method: 'GET',
      url: `/statistics/gameResults/${studentId}`,
      headers: {
        'authorization': `Mindheld ${context.rootState.auth.token}`,
      }
    })
    if(response.data.status === 'ok'){
      response.data.result.forEach(function(value, index){
        console.log(value);
        result.push(
          {
              series: [
                value.success,
                value.fails
              ],
              colors: ['#3DE54A', '#FF0000'],
              chart: {
                height: 350,
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: `Juego ${value.gameName}`,
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: value.xaxis,
              }
            }
        )
      })
    }

  }catch (e) {
    console.log(`error getting gamesStatistic ${e}`)
  } finally {
    context.commit('setLoading', false, {root: true})
    console.log('llamado prueba');
    console.log(result);
    return result
  }
}

export async function saveGameResult(context, gameResult){
  try {
    const response = await Vue.axios({
      method: 'POST',
      url: '/statistics/public/saveStatistic',
      data: gameResult,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (e) {
    console.log(`error on create saveGameResult ${e}`)
  }
}
