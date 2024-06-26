const getters = {
  variation: state => state.variations.variation,
  language: state => state.apps.language,
  gene: state => state.variations.gene,
  position: state => state.variations.position,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.name,
  real_name: state => state.user.real_name,
  permission_routes: state => state.permission.routes
}
export default getters
