
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

interface SimulationData {
  id: number;
  name: string;
  description: string;
  data: string;
}

class BackendAPIWrapper {
  public baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  me(): Promise<UserDetails> {
    return this._getRequest(this.baseURL + "/me")
  }

  logout(): void {
    this._getRequest(this.baseURL + "/logout")
  }

  listSimulations(): Promise<SimulationData[]> {
    return this._getRequest(this.baseURL + "/listSimulations")
  }

  getSimulation(simulationId: number): Promise<SimulationData> {
    return this._getRequest(this.baseURL + `/getSimulation/${simulationId}`)
  }

  deleteSimulation(simulationId: number): <StatusMessage>

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
        credentials: "include",
        body: body
      }
    )
    return rawResponse.json()
  }

  private async _getRequest(url: string): Promise<any> {
    const rawResponse = await fetch(
      url,
      {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
      }
    )
    return rawResponse.json()
  }


}


export default BackendAPIWrapper