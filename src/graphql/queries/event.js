export const EVENT_QUERY = `
query ($eventID: ID!){
  event(eventID: $eventID){
    name
    isTeamEvent
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
    acceptRegistrations
    isUserAllowedToRegister
    registrationCloseTimestamp
    details
    isTeamEvent
    minTeamSize
    maxTeamSize
  }
}
`;

export const EVENT_REG_FORM_QUERY = `
query ($parentID: ID, $slug: String, $eventID: ID) {
  event(parentID: $parentID, slug: $slug, eventID: $eventID) {
    name
    slug
    id
    requireApproval
    isTeamEvent
    minTeamSize
    maxTeamSize
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
      charLimit
      maxSelections
      isPublic
      isURL
      formats
    }
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
      id
      acceptRegistrations
      isUserAllowedToRegister
      shortDescription
      registrationCloseTimestamp
      posterURL
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
mutation ($eventID: ID!, $teamID: ID, $data: JSONString){
  participate(eventID: $eventID, teamID: $teamID, data: $data){
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

export const SUBMIT_MUTATION = `
mutation ($file: Upload, $url: String, $key: String!, $participantID: ID!) {
  submit(file: $file, url: $url, key: $key, participantID: $participantID){
    id
  }
}`;

export const MY_BASIC_EVENT_PROFILE_QUERY = `
query ($eventID: ID!){
  myEventProfile(eventID: $eventID){
    isApproved
    timestampRegistered
    remarks
    formData{
      key
      value
    }
    submissions{
      url
      fileURL
      key
    }
  }
}`;

export const MY_EVENT_REGS = `
query ($eventID: ID!){
  myEvents(parentID: $eventID){
    isApproved
    event{
      name
      slug
    }
    timestampRegistered
  }
}`;