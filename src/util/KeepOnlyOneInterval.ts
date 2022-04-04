export class KeepOnlyOneInterval {
  private _subscriptions = 0
  private _timer?: NodeJS.Timer

  addSubscription(value: NodeJS.Timer) {
    this._subscriptions++
    if (this._subscriptions > 1) {
      clearInterval(value)
      return
    }
    this._timer = value
  }

  removeSubscription() {
    this._subscriptions--
    if (this._subscriptions === 0) {
      clearInterval(this._timer)
      this._timer = null
    }
  }
}
