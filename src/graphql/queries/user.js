

export const REGISTER_MUTATION = `
mutation ($input: UserCreationInput!){
  register(input: $input){
    success
  }
}`;

export const LOGIN_MUTATION = `
mutation ($username: String!, $password: String!){
  authenticateUser(username: $username, password: $password){
    success
    user
    {
      id
      username
      name
      email
      phone
      type
      isProfileComplete
      emailVerified: isEmailVerified
      phoneVerified: isPhoneVerified
    }
  }
}`;

export const UPDATE_MUTATION = `
mutation ($update: UserUpdationInput!){
  updateProfile(update: $update){
    success
  }
}`;

export const RESEND_EMAIL_MUTATION = `
mutation {
  resendConfirmationEmail
}`;

export const VERIFY_EMAIL_MUTATION = `
mutation ($otp: String!){
  verifyEmail(otp: $otp)
}`;

export const RESEND_OTP_MUTATION = `
mutation ($phone: String){
  resendOTP(phone: $phone)
}`;

export const VERIFY_OTP_MUTATION = `
mutation ($otp: String!){
  verifyOTP(otp: $otp)
}`;