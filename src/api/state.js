import request from '@/utils/request'

export function getStates() {
  return request({
    url: '/states',
    method: 'get'
  })
}
