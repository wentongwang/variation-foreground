import request from '@/utils/request'

export function variations(data) {
  return request({
    url: '/variation',
    method: 'post',
    data
  })
}

export function search(data) {
  return request({
    url: '/search',
    method: 'post',
    data: { str: data }
  })
}

export function genePositionData(data) {
  return request({
    url: '/genePositionData',
    method: 'post',
    data: data
  })
}

export function variant(data) {
  return request({
    url: '/variant',
    method: 'post',
    data: data
  })
}
