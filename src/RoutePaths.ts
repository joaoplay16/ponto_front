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

export const navigationRoutes = {
  login: `/${LOGIN}`,
  logout: `/${LOGOUT}`,
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
    settings: `/${ADMIN}/${SETTINGS}`
  }
}
