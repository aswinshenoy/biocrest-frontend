export const MY_PROFILE_QUERY = `
query {
  me{
    username
    title
    name
    email
    phone
    city
    state
    country
    gender
    type
    affiliationTitle {
         value: id
         label: name
    }
    affiliationBody {
         value: id
         label: name
    }
    IDCardURL
    emailVerified: isEmailVerified
    phoneVerified: isPhoneVerified
  }
}`;

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
      title
      username
      name
      email
      phone
      type
      gender
      city
      state
      country
      isProfileComplete
      affiliationTitle {
         value: id
         label: name
      }
      affiliationBody {
         value: id
         label: name
      }
      emailVerified: isEmailVerified
      phoneVerified: isPhoneVerified
    }
  }
}`;

export const REQUEST_PASSWORD_RESET =
`mutation ($email: String!){
  requestPasswordReset(email: $email)
}`;

export const RESET_PASSWORD__MUTATION =
`mutation ($email: String!, $password: String!, $otp: String!){
  resetPassword(email: $email,newPassword: $password, otp: $otp)
}`;

export const UPDATE_MUTATION = `
mutation ($update: UserUpdationInput!){
  updateProfile(update: $update){
    success
  }
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
query ($eventID: ID!, $search: String, $count: Int, $after: String, $filters: ParticipantQueryFilters) {
  participants(
    eventID: $eventID
    search: $search
    count: $count
    after: $after
    filters: $filters
  ) {
    hasNext
    totalCount
    lastCursor
    participants {
      uuid
      id
      remarks
      isApproved
      team{
        id
        name
        members{
          id
          title
          name
          phone
          email
        }
      }
      profile {
        id
        title
        name
        email
        isEmailVerified
        phone
        isPhoneVerified
        city
        state
        country
        gender
        type
        affiliationTitle {
          value: id
          label: name
        }
        affiliationBody {
          value: id
          label: name
        }
        dateJoined
        IDCardURL
      }
      submissions {
        id
        url
        fileURL
        key
      }
      formData {
        label: key
        value
      }
    }
  }
}`;