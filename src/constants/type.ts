export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  Admin: 'Admin',
  Manager: 'Manager',
  Customer: 'Customer'
} as const

export const RoleValues = [Role.Admin, Role.Manager, Role.Customer] as const
