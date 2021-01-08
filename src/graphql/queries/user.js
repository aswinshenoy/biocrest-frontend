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
      profile {
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
        dateJoined
        IDCardURL
      }
      formData {
        label: key
        value
      }
    }
  }
}`;