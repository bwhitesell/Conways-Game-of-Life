
export interface StatusMessage {
  error: boolean;
  message: string;
}

export interface UserDetails {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimulationData {
  id: number;
  name: string;
  description: string;
  data: boolean[][];
}

class BackendAPIClient {
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  public me(): Promise<UserDetails | StatusMessage> {
    return this._getRequest(this.baseURL + "/me")
  }

  public async logout(): Promise<void> {
    await this._getRequest(this.baseURL + "/logout")
  }

  public listSimulations(): Promise<SimulationData[] | StatusMessage > {
    return this._getRequest(this.baseURL + "/listSimulations")
  }

  public getSimulation(simulationId: number): Promise<SimulationData | StatusMessage> {
    return this._getRequest(this.baseURL + `/getSimulation/${simulationId}`)
  }

  public createSimulation(
    name: string,
    description: string,
    data: boolean[][]
  ): Promise<StatusMessage> {

    const simulationData = {name: name, description: description, data: data}
    return this._postRequest(
      this.baseURL + '/createSimulation', 
      JSON.stringify(simulationData)
    )
  }

  public deleteSimulation(simulationId: number) {
    return this._deleteRequest(this.baseURL + `/deleteSimulation/${simulationId}`)
  }

  public registerUser(username: string, password: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/createUser',
      JSON.stringify({username: username, password: password})
    ) 
  }

  public loginUser(username: string, password: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/login',
      JSON.stringify({username: username, password: password})
    ) 
  }

  public checkUsernameValidity(username: string): Promise<StatusMessage> {
    return this._postRequest(
      this.baseURL + '/validateUsername',
      JSON.stringify({username: username})
    )
  }

  public checkPasswordValidity(password: string): Promise<StatusMessage> {
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

  private async _deleteRequest(url: string): Promise<any> {
    const rawResponse = await fetch(
      url,
      {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
      }
    )
  }


}


export default BackendAPIClient