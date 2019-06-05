import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/classes/info',
    method: 'get',
    params: { token }
  })
}

export function getClass() {
  return request({
    url: '/classes',
    method: 'get'
  })
}

export function addClass(data) {
  return request({
    url: '/classes',
    method: 'post',
    data
  })
}

export function updateClass(id, data) {
  return request({
    url: `/classes/${id}`,
    method: 'put',
    data
  })
}

export function deleteClass(id) {
  return request({
    url: `/classes/${id}`,
    method: 'delete'
  })
}
