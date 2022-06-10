export class MarketItem {
  constructor(private readonly _tokenID: string, private readonly _price: string) {}
  get tokenID() {
    return this._tokenID
  }
  get price() {
    return this._price
  }
}
