import { ExchangeFacade } from './facade/ExchangeFacade';
import { ExchangeSelector } from './facade/ExchangeSelector';
import { IExchangeConfig, IAccount, IOrderDetailRequest, IOrderDetailResponse } from './core/types';
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  ITickerRequest,
  ITicker,
  IOrderbookRequest,
  IOrderbook,
  ISupportedLevelsRequest,
  ISupportedLevels,
  IMarket,
  ISecondCandleRequest,
  ISecondCandle,
  IMinuteCandleRequest,
  IMinuteCandle,
  IDayCandleRequest,
  IDayCandle,
  IWeekCandleRequest,
  IWeekCandle,
  IYearCandleRequest,
  IYearCandle,
  ITradeTicksRequest,
  ITradeTick,
  ITickerAllRequest,
} from './strategies/upbit/types';

export class KoreaCryptoExchange {
  private facade: ExchangeFacade;

  constructor(config: IExchangeConfig) {
    this.facade = new ExchangeFacade(new ExchangeSelector(config).select());
  }

  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    return this.facade.placeOrder(params);
  }

  async getAccounts(): Promise<IAccount[]> {
    return this.facade.getAccounts();
  }

  async getOrderDetail(params: IOrderDetailRequest): Promise<IOrderDetailResponse> {
    return this.facade.getOrderDetail(params);
  }

  async getMarkets(isDetails: boolean = false): Promise<IMarket[]> {
    return this.facade.getMarkets(isDetails);
  }

  async getTickers(params: ITickerRequest): Promise<ITicker[]> {
    return this.facade.getTickers(params);
  }

  async getTickersAll(params: ITickerAllRequest): Promise<ITicker[]> {
    return this.facade.getTickersAll(params);
  }

  async getOrderbook(params: IOrderbookRequest): Promise<IOrderbook[]> {
    return this.facade.getOrderbook(params);
  }

  async getSupportedLevels(params: ISupportedLevelsRequest): Promise<ISupportedLevels[]> {
    return this.facade.getSupportedLevels(params);
  }

  async getSecondCandles(params: ISecondCandleRequest): Promise<ISecondCandle[]> {
    return this.facade.getSecondCandles(params);
  }

  async getMinuteCandles(unit: number, params: IMinuteCandleRequest): Promise<IMinuteCandle[]> {
    return this.facade.getMinuteCandles(unit, params);
  }

  async getDayCandles(params: IDayCandleRequest): Promise<IDayCandle[]> {
    return this.facade.getDayCandles(params);
  }

  async getWeekCandles(params: IWeekCandleRequest): Promise<IWeekCandle[]> {
    return this.facade.getWeekCandles(params);
  }

  async getYearCandles(params: IYearCandleRequest): Promise<IYearCandle[]> {
    return this.facade.getYearCandles(params);
  }

  async getTradeTicks(params: ITradeTicksRequest): Promise<ITradeTick[]> {
    return this.facade.getTradeTicks(params);
  }
}

export { IExchangeConfig } from './core/types';
export {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  ITickerRequest,
  ITicker,
  IOrderbookRequest,
  IOrderbook,
  ISupportedLevelsRequest,
  ISupportedLevels,
  IMarket,
  ISecondCandleRequest,
  ISecondCandle,
  IMinuteCandleRequest,
  IMinuteCandle,
  IDayCandleRequest,
  IDayCandle,
  IWeekCandleRequest,
  IWeekCandle,
  IYearCandleRequest,
  IYearCandle,
  ITradeTicksRequest,
  ITradeTick,
  ITickerAllRequest,
} from './strategies/upbit/types';
export { IAccount, IOrderDetailRequest, IOrderDetailResponse } from './core/types';
