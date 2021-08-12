import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'role'
const NameKey = 'name'
const IntrodcuctionKey = 'introduction'

export function getToken() {
  return (Cookies.get(TokenKey))?(Cookies.get(TokenKey)):'admin-token'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  let rolArr = [];
  (Cookies.get(RoleKey)) ? rolArr.push(Cookies.get(RoleKey)):rolArr.push('user')
  return rolArr
}

export function getName() {
  return (Cookies.get(NameKey))?(Cookies.get(NameKey)):'visitor'
}


export function getAvatar() {
  return ( !getName() && getName() !='visitor' ) ? 'http://dcloud.oa.com/Public/Avatar/' +(Cookies.get(NameKey))+ '.png':'http://dcloud.oa.com/Public/Avatar/male.png'
}

export function getIntroduction() {
  return (Cookies.get(IntrodcuctionKey))?(Cookies.get(IntrodcuctionKey)):'What a perfect person you are !'
}
