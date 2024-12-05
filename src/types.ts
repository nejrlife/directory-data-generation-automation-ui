export interface AppDetails {
  progressSpinnerShow: boolean,
  processDataPending: boolean,
  emps: any [],
  empsPending: boolean,
  empsError?: string,
  blueroomEmps: any [],
  blueroomPending: boolean,
  blueroomError?: string,
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

export interface ResponseGenerator{
  config?: any,
  data? :any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}


