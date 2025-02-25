declare module 'sslcommerz-lts' {
  export default class SSLCommerz {
    constructor(storeId: string, storePassword: string, isLive: boolean)
    init(data: object): Promise<{ GatewayPageURL: string }>
  }
}
