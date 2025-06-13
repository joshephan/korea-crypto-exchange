import { IExchangeStrategy, IExchangeConfig, IOrderDetailRequest } from '../../core/types';
import { BithumbExchange } from './exchange';
import { BithumbQuotation } from './quotation';
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  ITickerRequest,
  IOrderbookRequest,
  IOrderbook,
  IMarket,
  IMarketRequest,
  IMinuteCandleRequest,
  IMinuteCandle,
  IDayCandleRequest,
  IDayCandle,
  IWeekCandleRequest,
  IWeekCandle,
  IMonthCandleRequest,
  IMonthCandle,
  ITradeTicksRequest,
  ITradeTick,
  IMarketWarning,
  IAccount,
  IOrderChanceRequest,
  IOrderChanceResponse,
  IOrderDetailResponse,
  IOrderListRequest,
  IOrderListItem,
  ICancelOrderRequest,
  ICancelOrderResponse,
  IWithdrawListRequest,
  IWithdrawListItem,
  IWithdrawKrwListRequest,
  IWithdrawKrwListItem,
  IWithdrawChanceRequest,
  IWithdrawChanceResponse,
  IWithdrawCoinRequest,
  IWithdrawCoinResponse,
  IWithdrawKrwRequest,
  IWithdrawKrwResponse,
  IWithdrawAddress,
  IDepositKrwListRequest,
  IDepositKrwListItem,
  IDepositDetailRequest,
  IDepositDetailResponse,
  IGenerateDepositAddressRequest,
  IGenerateDepositAddressResponse,
  IDepositAddress,
  IGetDepositAddressRequest,
  IGetDepositAddressResponse,
  IDepositKrwRequest,
  IDepositKrwResponse,
  IWalletStatus,
  IApiKey,
  ITicker,
} from './types';

export class BithumbStrategy implements IExchangeStrategy {
  private exchange: BithumbExchange;
  private quotation: BithumbQuotation;

  constructor(config: IExchangeConfig) {
    this.exchange = new BithumbExchange(config);
    this.quotation = new BithumbQuotation(config);
  }

  // IExchangeStrategy 구현
  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    return this.exchange.placeOrder(params);
  }

  // BithumbExchange 메서드 위임
  async getAccounts(): Promise<IAccount[]> {
    return this.exchange.getAccounts();
  }

  async getOrderDetail(params: IOrderDetailRequest): Promise<IOrderDetailResponse> {
    return this.exchange.getOrderDetail(params as any);
  }

  // BithumbQuotation 메서드 위임
  async getMarkets(params?: IMarketRequest): Promise<IMarket[]> {
    return this.quotation.getMarkets(params);
  }

  async getTickers(params: ITickerRequest): Promise<ITicker[]> {
    return this.quotation.getTickers(params);
  }

  async getOrderbook(params: IOrderbookRequest): Promise<IOrderbook[]> {
    return this.quotation.getOrderbook(params);
  }

  async getMinuteCandles(unit: number, params: IMinuteCandleRequest): Promise<IMinuteCandle[]> {
    return this.quotation.getMinuteCandles(unit, params);
  }

  async getDayCandles(params: IDayCandleRequest): Promise<IDayCandle[]> {
    return this.quotation.getDayCandles(params);
  }

  async getWeekCandles(params: IWeekCandleRequest): Promise<IWeekCandle[]> {
    return this.quotation.getWeekCandles(params);
  }

  async getMonthCandles(params: IMonthCandleRequest): Promise<IMonthCandle[]> {
    return this.quotation.getMonthCandles(params);
  }

  async getTradeTicks(params: ITradeTicksRequest): Promise<ITradeTick[]> {
    return this.quotation.getTradeTicks(params);
  }

  async getMarketWarnings(): Promise<IMarketWarning[]> {
    return this.quotation.getMarketWarnings();
  }

  async getOrderChance(params: IOrderChanceRequest): Promise<IOrderChanceResponse> {
    return this.exchange.getOrderChance(params);
  }

  async getOrderList(params: IOrderListRequest): Promise<IOrderListItem[]> {
    return this.exchange.getOrderList(params);
  }

  async cancelOrder(params: ICancelOrderRequest): Promise<ICancelOrderResponse> {
    return this.exchange.cancelOrder(params);
  }

  async getWithdrawList(params: IWithdrawListRequest): Promise<IWithdrawListItem[]> {
    return this.exchange.getWithdrawList(params);
  }

  async getWithdrawKrwList(params: IWithdrawKrwListRequest): Promise<IWithdrawKrwListItem[]> {
    return this.exchange.getWithdrawKrwList(params);
  }

  async getWithdrawChance(params: IWithdrawChanceRequest): Promise<IWithdrawChanceResponse> {
    return this.exchange.getWithdrawChance(params);
  }

  async withdrawCoin(params: IWithdrawCoinRequest): Promise<IWithdrawCoinResponse> {
    return this.exchange.withdrawCoin(params);
  }

  async withdrawKrw(params: IWithdrawKrwRequest): Promise<IWithdrawKrwResponse> {
    return this.exchange.withdrawKrw(params);
  }

  async getWithdrawAddresses(): Promise<IWithdrawAddress[]> {
    return this.exchange.getWithdrawAddresses();
  }

  async getDepositKrwList(params: IDepositKrwListRequest): Promise<IDepositKrwListItem[]> {
    return this.exchange.getDepositKrwList(params);
  }

  async getDepositDetail(params: IDepositDetailRequest): Promise<IDepositDetailResponse> {
    return this.exchange.getDepositDetail(params);
  }

  async generateDepositAddress(
    params: IGenerateDepositAddressRequest,
  ): Promise<IGenerateDepositAddressResponse> {
    return this.exchange.generateDepositAddress(params);
  }

  async getDepositAddresses(): Promise<IDepositAddress[]> {
    return this.exchange.getDepositAddresses();
  }

  async getDepositAddress(params: IGetDepositAddressRequest): Promise<IGetDepositAddressResponse> {
    return this.exchange.getDepositAddress(params);
  }

  async depositKrw(params: IDepositKrwRequest): Promise<IDepositKrwResponse> {
    return this.exchange.depositKrw(params);
  }

  async getWalletStatus(): Promise<IWalletStatus[]> {
    return this.exchange.getWalletStatus();
  }

  async getApiKeys(): Promise<IApiKey[]> {
    return this.exchange.getApiKeys();
  }
}

export { BithumbExchange, BithumbQuotation };
