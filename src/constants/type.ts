export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  Admin: 'ADULT',
  Manager: 'LECTURER',
  Customer: 'ADMIN'
} as const

export const RoleValues = [Role.Admin, Role.Manager, Role.Customer] as const

export const Gender = {
  Male: 'MALE',
  Female: 'FEMALE',
  Other: 'OTHER'
} as const

export const GenderValues = [Gender.Male, Gender.Female, Gender.Other] as const

export const TypeResource = {
  Video: 'VIDEO',
  Document: 'DOCUMENT',
  Both: 'BOTH'
} as const

export const TypeResourceValues = [TypeResource.Video, TypeResource.Document, TypeResource.Both] as const
