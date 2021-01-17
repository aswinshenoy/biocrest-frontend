export const EVENT_QUERY = `
query ($eventID: ID!){
  event(eventID: $eventID){
    name
    formFields{
      type
      label
      key
      options
      {
        value
        label
        allowedUserTypes
      }
      maxSelections
    }
  }
}`;

export const EVENT_DETAILS_QUERY = `
query ($parentID: ID, $slug: String) {
  event(parentID: $parentID, slug: $slug) {
    name
    slug
    shortDescription
    coverURL
    details
    isTeamEvent
    minTeamSize
    maxTeamSize
  }
}
`;

export const EVENTS_QUERY = `
query ($parentID: ID){
  events(parentID: $parentID){
    totalCount
    events{
      name
      slug
      shortDescription
      coverURL
    }
  }
}`;

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
        email
    }
    event{
      name
      formFields{
        type
        label
        key
        maxSelections
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
        maxSelections
        options{
          value
          label
        }
      }
    }
  }
}`;