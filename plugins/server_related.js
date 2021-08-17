
export default function ({$axios, app }) {
  const csrftoken = app.$cookies.get('csrftoken');

  if (!csrftoken){
    $axios.get('/api/auth/mytoken/')
  }
  $axios.setHeader('X-CSRFToken', csrftoken)
}
