declare module 'react-native-ble-advertiser' {
  export default class BLEAdvertiser {
    static setCompanyId(id: number): void;
    static broadcast(
      uuid: string,
      data: number[],
      options?: object,
    ): Promise<any>;
    static stopBroadcast(): Promise<any>;
  }
}
