import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/clazz/info',
    method: 'get',
    params: { token }
  })
}

export function getClass() {
  return request({
    url: '/clazz',
    method: 'get'
  })
}

export function addClass(data) {
  return request({
    url: '/clazz',
    method: 'post',
    data
  })
}

export function updateClass(id, data) {
  return request({
    url: `/clazz/${id}`,
    method: 'put',
    data
  })
}

export function deleteClass(id) {
  return request({
    url: `/clazz/${id}`,
    method: 'delete'
  })
}

export function addLack(lack) {
  console.log(lack.master)
  return request({
    url: `/clazz/${lack.master.id}/${lack.clazz.id}`,
    method: 'post',
    lack
  })
}

export function getClassEnable() {
  return request({
    url: '/clazz/enable',
    method: 'get'
  })
}
