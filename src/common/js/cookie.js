export function setCookie(name, value, time) {
  const exp = new Date()
  if (time) {
    exp.setTime(exp.getTime() + time * 24 * 60 * 1000)
  } else {
    exp.setTime(exp.getTime() + 10 * 60 * 1000)
  }

  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString()
}

export function getCookieValue(name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export function delCookie(name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 60 * 1000)
  const cval = getCookieValue(name)

  document.cookie = name + '=' + cval + ';path=/;expires=' + exp.toUTCString()
}
