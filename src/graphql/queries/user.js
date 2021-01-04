

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

export const PROFILES_TO_VERIFY_QUERY = `
{
  profilesToVerify{
    user
    {
      id
      name
      email
      phone
      type
      isEmailVerified
      isPhoneVerified
      isIDVerified
    }
    image
    timestamp
  }
}`;

export const APPROVE_REGISTRATION_MUTATION = `
mutation ($userID: ID!, $update: UserUpdationInput, $remarks: String){
  approveRegistration(userID: $userID, update: $update, remarks: $remarks)
}`;

export const REJECT_VERIFICATION =
`mutation ($userID: ID!, $remarks: String){
  rejectVerification(userID: $userID, remarks: $remarks)
}`;

export const MY_REGISTRATION_QUERY =
`{
  me{
    isProfileComplete
    isIDVerified
    requiresCorrection
    remarks
  }
}`;

export const PROFILES_QUERY = `
query ($key: String){
  profiles(key: $key){
    id
    name
    email
    phone
    type
    isPhoneVerified
    isEmailVerified
    isIDVerified
    dateJoined
    isProfileComplete
    requiresCorrection
  }
}`;