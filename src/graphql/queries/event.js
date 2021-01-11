export const MY_EVENT_PROFILE_QUERY = `
query ($eventID: ID!){
  myEventProfile(eventID: $eventID){
    id
    uuid
    formData{
      key
      value
    }
    isApproved
    remarks
    profile {
        title
        name
        type
        gender
        city
        state
        country
    }
    event{
      name
      formFields{
        type
        label
        key
        options{
          value
          label
          allowedUserTypes
        }
      }
    }
  }
}`;

export const PARTICIPATE_MUTATION = `
mutation ($eventID: ID!, $data: JSONString){
  participate(eventID: $eventID, data: $data){
    uuid
    id
    formData{
      key
      value
    }
    event{
      name
      formFields{
        type
        label
        key
        options{
          value
          label
        }
      }
    }
  }
}`;