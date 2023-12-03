import Cookies from 'js-cookie'
export default function verifyToken() {
  // Get the token from local storage
  const token = Cookies.get('my_token_key')

  // Make sure the token is available
  if (!token) {
    window.location.href = '/';
    throw new Error('Token not found')
  }
  return token
}
