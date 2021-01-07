

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
      isProfileComplete
      gender
      city
      state
      country
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

export const PROFILES_TO_VERIFY_QUERY = `
{
  profilesToVerify{
    user
    {
      id
      title
      name
      email
      phone
      type
      gender
      city
      state
      country
      affiliationTitle {
        value: id
        label: name
      }
      affiliationBody {
        value: id
        label: name
      }
      isEmailVerified
      isPhoneVerified
      isIDVerified
    }
    image
    timestamp
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
query ($key: String, $filters: ProfileQueryFilters){
  profiles(key: $key, filters: $filters){
    id
    title
    name
    email
    phone
    type
    city
    country
    state
    gender
    affiliationTitle {
        name
    }
    affiliationBody {
        name
    }
    isPhoneVerified
    isEmailVerified
    isIDVerified
    dateJoined
    isProfileComplete
    requiresCorrection
  }
}`;