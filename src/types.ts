export interface AppDetails {
  progressSpinnerShow: boolean,
  processDataPending: boolean,
  emps: any [],
  empsPending: boolean,
  blueroomEmps: any [],
  blueroomPending: boolean,
  filteredSponsoredEmps: any[],
  admUnsponsoredEmps: any[],
  nonBlueroomIbmEmps: any[]
}

export interface AuthenticateUserDetails {
  userToken: string,
  customerId: string,
  isUserAuthenticated: boolean,
  logInError: string,
  logInPending: boolean,
  isAuthenticatedError: string,
  isAuthenticatedPending: boolean
}



