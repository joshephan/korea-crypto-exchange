import {
  IExchangeStrategy,
  IAccount,
  IOrderDetailRequest,
  IOrderDetailResponse,
} from '../core/types';
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
} from '../strategies/upbit/types';

export class ExchangeFacade {
  private strategy: IExchangeStrategy;

  constructor(strategy: IExchangeStrategy) {
    this.strategy = strategy;
  }

  async getAccounts(): Promise<IAccount[]> {
    if ('getAccounts' in this.strategy) {
      return (this.strategy as any).getAccounts();
    }
    throw new Error('Current exchange does not support account information retrieval');
  }

  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    return this.strategy.placeOrder(params);
  }

  async getOrderDetail(params: IOrderDetailRequest): Promise<IOrderDetailResponse> {
    if ('getOrderDetail' in this.strategy) {
      return (this.strategy as any).getOrderDetail(params);
    }
    throw new Error('Current exchange does not support order detail retrieval');
  }

  // UpbitQuotation 메서드들
  async getMarkets(isDetails: boolean = false): Promise<IMarket[]> {
    if ('getMarkets' in this.strategy) {
      return (this.strategy as any).getMarkets(isDetails);
    }
    throw new Error('Current exchange does not support market information retrieval');
  }

  async getTickers(params: ITickerRequest): Promise<ITicker[]> {
    if ('getTickers' in this.strategy) {
      return (this.strategy as any).getTickers(params);
    }
    throw new Error('Current exchange does not support ticker information retrieval');
  }

  async getTickersAll(params: ITickerAllRequest): Promise<ITicker[]> {
    if ('getTickersAll' in this.strategy) {
      return (this.strategy as any).getTickersAll(params);
    }
    throw new Error('Current exchange does not support all ticker information retrieval');
  }

  async getOrderbook(params: IOrderbookRequest): Promise<IOrderbook[]> {
    if ('getOrderbook' in this.strategy) {
      return (this.strategy as any).getOrderbook(params);
    }
    throw new Error('Current exchange does not support orderbook information retrieval');
  }

  async getSupportedLevels(params: ISupportedLevelsRequest): Promise<ISupportedLevels[]> {
    if ('getSupportedLevels' in this.strategy) {
      return (this.strategy as any).getSupportedLevels(params);
    }
    throw new Error('Current exchange does not support supported levels information retrieval');
  }

  async getSecondCandles(params: ISecondCandleRequest): Promise<ISecondCandle[]> {
    if ('getSecondCandles' in this.strategy) {
      return (this.strategy as any).getSecondCandles(params);
    }
    throw new Error('Current exchange does not support second candle information retrieval');
  }

  async getMinuteCandles(unit: number, params: IMinuteCandleRequest): Promise<IMinuteCandle[]> {
    if ('getMinuteCandles' in this.strategy) {
      return (this.strategy as any).getMinuteCandles(unit, params);
    }
    throw new Error('Current exchange does not support minute candle information retrieval');
  }

  async getDayCandles(params: IDayCandleRequest): Promise<IDayCandle[]> {
    if ('getDayCandles' in this.strategy) {
      return (this.strategy as any).getDayCandles(params);
    }
    throw new Error('Current exchange does not support day candle information retrieval');
  }

  async getWeekCandles(params: IWeekCandleRequest): Promise<IWeekCandle[]> {
    if ('getWeekCandles' in this.strategy) {
      return (this.strategy as any).getWeekCandles(params);
    }
    throw new Error('Current exchange does not support week candle information retrieval');
  }

  async getYearCandles(params: IYearCandleRequest): Promise<IYearCandle[]> {
    if ('getYearCandles' in this.strategy) {
      return (this.strategy as any).getYearCandles(params);
    }
    throw new Error('Current exchange does not support year candle information retrieval');
  }

  async getTradeTicks(params: ITradeTicksRequest): Promise<ITradeTick[]> {
    if ('getTradeTicks' in this.strategy) {
      return (this.strategy as any).getTradeTicks(params);
    }
    throw new Error('Current exchange does not support trade tick information retrieval');
  }
}
