import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function adminLogin(data) {
  return request({
    url: '/adminLogin',
    method: 'post',
    data
  })
}

export function forgot(data) {
  return request({
    url: '/forgot',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function sendCode(data) {
  return request({
    url: '/sendCode',
    method: 'post',
    data
  })
}

export function forgotSendCode(data) {
  return request({
    url: '/forgotSendCode',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/getInfo',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/getUserList',
    method: 'post',
    data
  })
}

export function userAdopt(data) {
  return request({
    url: '/userAdopt',
    method: 'post',
    data
  })
}

export function userReject(data) {
  return request({
    url: '/userReject',
    method: 'post',
    data
  })
}

export function userBan(data) {
  return request({
    url: '/userBan',
    method: 'post',
    data
  })
}

export function userLift(data) {
  return request({
    url: '/userLift',
    method: 'post',
    data
  })
}

export function userDelete(data) {
  return request({
    url: '/userDelete',
    method: 'post',
    data
  })
}