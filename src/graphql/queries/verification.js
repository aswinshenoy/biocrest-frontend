export const APPROVE_REGISTRATION_MUTATION = `
mutation ($userID: ID!, $update: UserUpdationInput, $remarks: String){
  approveRegistration(userID: $userID, update: $update, remarks: $remarks)
}`;

export const REJECT_VERIFICATION =
    `mutation ($userID: ID!, $remarks: String){
  rejectVerification(userID: $userID, remarks: $remarks)
}`;