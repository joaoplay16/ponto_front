export const LOGIN = "login"
export const LOGOUT = "logout"
export const PROFILE = "perfil"
export const REPORT = "relatorio"
export const WORKING_HOURS = "horas_trabalhadas"
export const CALENDAR = "calendario"
export const RESQUESTS = "solicitacoes"
export const SETTINGS = "configuracoes"
export const ADMIN = "admin"
export const CLOCK_IN = "ponto"
export const USERS = "usuarios"
export const USER = "usuario"
export const REGISTER = "cadastro"
export const FORGOT_PASSWORD = "esqueci_minha_senha"
export const CHANGE_PASSWORD = "mudar_senha"
export const CONTINUE_REGISTER = "continuar_cadastro"

export const navigationRoutes = {
  login: `/${LOGIN}`,
  logout: `/${LOGOUT}`,
  register: `/${REGISTER}`,
  forgotPassword: `/${FORGOT_PASSWORD}`,
  changePassword: `/${CHANGE_PASSWORD}`,
  continueRegister: `/${CONTINUE_REGISTER}`,
  user: {
    profile: `/${PROFILE}`,
    report: {
      wourkingHours: `/${REPORT}/${WORKING_HOURS}`,
      clockIn: `/${REPORT}/${CLOCK_IN}`
    },
    calendar: `/${CALENDAR}`,
    requests: `/${RESQUESTS}`,
    settings: `/${SETTINGS}`
  },
  admin: {
    profile: `/${ADMIN}/${PROFILE}`,
    report: { wourkingHours: `/${ADMIN}/${REPORT}/${WORKING_HOURS}`, users: `/${ADMIN}/${REPORT}/${USERS}` },
    calendar: `/${ADMIN}/${CALENDAR}`,
    requests: `/${ADMIN}/${RESQUESTS}`,
    settings: `/${ADMIN}/${SETTINGS}`,
    register_user: `/${ADMIN}/${USER}/${REGISTER}`,
    user_profile: `/${ADMIN}/${USER}/:id/${PROFILE}`
  }
}
