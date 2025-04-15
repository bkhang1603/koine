export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  Admin: 'ADMIN',
  Manager: 'MANAGER',
  ContentCreator: 'CONTENT_CREATOR',
  Expert: 'EXPERT',
  Salesman: 'SALESMAN',
  Adult: 'ADULT',
  Child: 'CHILD',
  Supporter: 'SUPPORTER'
} as const

export const RoleValues = [
  Role.Admin,
  Role.Manager,
  Role.ContentCreator,
  Role.Expert,
  Role.Salesman,
  Role.Adult,
  Role.Child,
  Role.Supporter
] as const

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

export const DeliveryMethod = {
  STANDARD: 'STANDARD',
  EXPEDITED: 'EXPEDITED',
  NONESHIP: 'NONESHIP'
} as const

export const DeliveryMethodValues = [
  DeliveryMethod.STANDARD,
  DeliveryMethod.EXPEDITED,
  DeliveryMethod.NONESHIP
] as const

export const OrderType = {
  COURSE: 'COURSE',
  PRODUCT: 'PRODUCT',
  COMBO: 'COMBO'
} as const

export const OrderTypeValues = [OrderType.COURSE, OrderType.PRODUCT, OrderType.COMBO] as const

export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  DELIVERING: 'DELIVERING',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  FAILED_PAYMENT: 'FAILED_PAYMENT',
  REFUND_REQUEST: 'REFUND_REQUEST',
  REFUNDING: 'REFUNDING',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
} as const

export const OrderStatusValues = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.DELIVERING,
  OrderStatus.DELIVERED,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.FAILED_PAYMENT,
  OrderStatus.REFUND_REQUEST,
  OrderStatus.REFUNDING,
  OrderStatus.REFUNDED,
  OrderStatus.FAILED
] as const

export const PaymentMethod = {
  BANKING: 'BANKING',
  COD: 'COD'
} as const

export const PaymentMethodValues = [PaymentMethod.BANKING, PaymentMethod.COD] as const

export const RefundStatus = {
  REFUND_REQUEST: 'REFUND_REQUEST',
  REFUNDING: 'REFUNDING',
  REFUNDED: 'REFUNDED'
} as const

export const RefundStatusValues = [RefundStatus.REFUND_REQUEST, RefundStatus.REFUNDING, RefundStatus.REFUNDED] as const

export const TicketType = {
  COURSE: 'COURSE',
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
  BLOG: 'BLOG',
  GUEST: 'GUEST'
} as const

export const TicketTypeValues = [
  TicketType.COURSE,
  TicketType.PRODUCT,
  TicketType.ORDER,
  TicketType.BLOG,
  TicketType.GUEST
] as const

export const ReportType = {
  COURSE: 'COURSE',
  BLOG: 'BLOG',
  LECTURER: 'LECTURER '
} as const

export const ReportTypeValues = [ReportType.COURSE, ReportType.BLOG, ReportType.LECTURER] as const
