type IResult = {
  _id: string
  title: string
  value: number
}

type NetworkResults = {
  costPerResults: IResult[]
  results: IResult[]
  amountSpent: number
  reach: number
}

export type INetwork = {
  _id: string
  name: string
  addResults?: NetworkResults
}

export type NetworkType = {
  network: INetwork,
  campaingId: string,
  handleReload: () => void
}