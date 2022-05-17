
export interface StatusMessage {
  error: boolean;
  message: string;
}

interface UserDetails {
  username: string
  password: string
  createdAt: string,
  udatedAt: string,
}


class BackendAPIWrapper {
  public baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async me(): Promise<UserDetails> {
    const rawMeResponse = await fetch(this.baseURL + '/me')
    return rawMeResponse.json()
  }

  registerUser(username: string, password: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/createUser',
      JSON.stringify({username: username, password: password})
    ) 
  }

  loginUser(username: string, password: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/login',
      JSON.stringify({username: username, password: password})
    ) 
  }

  checkUsernameValidity(username: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/validateUsername',
      JSON.stringify({username: username})
    )
  }

  checkPasswordValidity(password: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/validatePassword',
      JSON.stringify({password: password})
    )
  }

  private async _postRequest(url: string, body: string): Promise<any> {
    const rawResponse = await fetch(
      url,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
      }
    )
    return rawResponse.json()
  }


}


export default BackendAPIWrapper