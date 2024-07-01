export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  Owner: 'Owner',
  Employee: 'Employee'
} as const

export const RoleValues = [Role.Owner, Role.Employee] as const
