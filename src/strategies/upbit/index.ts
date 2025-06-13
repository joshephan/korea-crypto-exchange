import { IExchangeStrategy, IExchangeConfig, IOrderDetailRequest } from '../../core/types';
import { UpbitExchange } from './exchange';
import { UpbitQuotation } from './quotation';
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  ITickerRequest,
  IOrderbookRequest,
  IOrderChanceRequest,
  IOrderChanceResponse,
  IOrderListRequest,
  IOrderListItem,
  IClosedOrderRequest,
  IClosedOrderResponse,
  ICancelOrderRequest,
  ICancelOrderResponse,
  IBulkCancelOrderRequest,
  IBulkCancelOrderResponse,
  ICancelOrderListRequest,
  ICancelOrderListResponse,
  ICancelAndNewOrderRequest,
  ICancelAndNewOrderResponse,
  IWithdrawListRequest,
  IWithdrawListItem,
  IWithdrawDetailRequest,
  IWithdrawDetailResponse,
  IWithdrawChanceRequest,
  IWithdrawChanceResponse,
  IWithdrawCoinRequest,
  IWithdrawCoinResponse,
  IWithdrawKrwRequest,
  IWithdrawKrwResponse,
  IWithdrawAddress,
  ICancelWithdrawCoinRequest,
  ICancelWithdrawCoinResponse,
  IDepositListRequest,
  IDepositListItem,
  IDepositDetailRequest,
  IDepositDetailResponse,
  IGetDepositAddressRequest,
  IGetDepositAddressResponse,
  IDepositKrwRequest,
  IDepositKrwResponse,
  ITravelRuleDepositUuidRequest,
  ITravelRuleDepositUuidResponse,
  ITravelRuleDepositTxidRequest,
  ITravelRuleDepositTxidResponse,
  IDepositChanceCoinRequest,
  IDepositChanceCoinResponse,
  IWalletStatus,
  IApiKey,
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
  ISupportedLevelsRequest,
  ISupportedLevels,
  ITicker,
} from './types';

export class UpbitStrategy implements IExchangeStrategy {
  private exchange: UpbitExchange;
  private quotation: UpbitQuotation;

  constructor(config: IExchangeConfig) {
    this.exchange = new UpbitExchange(config);
    this.quotation = new UpbitQuotation(config);
  }

  // IExchangeStrategy 구현
  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    return this.exchange.placeOrder(params);
  }

  // UpbitExchange 메서드 위임
  async getAccounts() {
    return this.exchange.getAccounts();
  }

  async getOrderDetail(params: IOrderDetailRequest) {
    return this.exchange.getOrderDetail(params);
  }

  async getOrderChance(params: IOrderChanceRequest): Promise<IOrderChanceResponse> {
    return this.exchange.getOrderChance(params);
  }

  async getOrderList(params: IOrderListRequest): Promise<IOrderListItem[]> {
    return this.exchange.getOrderList(params);
  }

  async getClosedOrders(params: IClosedOrderRequest): Promise<IClosedOrderResponse[]> {
    return this.exchange.getClosedOrders(params);
  }

  async cancelOrder(params: ICancelOrderRequest): Promise<ICancelOrderResponse> {
    return this.exchange.cancelOrder(params);
  }

  async bulkCancelOrders(params: IBulkCancelOrderRequest): Promise<IBulkCancelOrderResponse> {
    return this.exchange.bulkCancelOrders(params);
  }

  async cancelOrderList(params: ICancelOrderListRequest): Promise<ICancelOrderListResponse> {
    return this.exchange.cancelOrderList(params);
  }

  async cancelAndNewOrder(params: ICancelAndNewOrderRequest): Promise<ICancelAndNewOrderResponse> {
    return this.exchange.cancelAndNewOrder(params);
  }

  async getWithdrawList(params: IWithdrawListRequest): Promise<IWithdrawListItem[]> {
    return this.exchange.getWithdrawList(params);
  }

  async getWithdrawDetail(params: IWithdrawDetailRequest): Promise<IWithdrawDetailResponse> {
    return this.exchange.getWithdrawDetail(params);
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

  async cancelWithdrawCoin(
    params: ICancelWithdrawCoinRequest,
  ): Promise<ICancelWithdrawCoinResponse> {
    return this.exchange.cancelWithdrawCoin(params);
  }

  async getDepositList(params: IDepositListRequest): Promise<IDepositListItem[]> {
    return this.exchange.getDepositList(params);
  }

  async getDepositDetail(params: IDepositDetailRequest): Promise<IDepositDetailResponse> {
    return this.exchange.getDepositDetail(params);
  }

  async getDepositAddress(params: IGetDepositAddressRequest): Promise<IGetDepositAddressResponse> {
    return this.exchange.getDepositAddress(params);
  }

  async depositKrw(params: IDepositKrwRequest): Promise<IDepositKrwResponse> {
    return this.exchange.depositKrw(params);
  }

  async verifyTravelRuleDepositUuid(
    params: ITravelRuleDepositUuidRequest,
  ): Promise<ITravelRuleDepositUuidResponse> {
    return this.exchange.verifyTravelRuleDepositUuid(params);
  }

  async verifyTravelRuleDepositTxid(
    params: ITravelRuleDepositTxidRequest,
  ): Promise<ITravelRuleDepositTxidResponse> {
    return this.exchange.verifyTravelRuleDepositTxid(params);
  }

  async getDepositChanceCoin(
    params: IDepositChanceCoinRequest,
  ): Promise<IDepositChanceCoinResponse> {
    return this.exchange.getDepositChanceCoin(params);
  }

  async getWalletStatus(): Promise<IWalletStatus[]> {
    return this.exchange.getWalletStatus();
  }

  async getApiKeys(): Promise<IApiKey[]> {
    return this.exchange.getApiKeys();
  }

  // UpbitQuotation 메서드 위임
  async getTickers(params: ITickerRequest) {
    return this.quotation.getTickers(params);
  }

  async getOrderbook(params: IOrderbookRequest) {
    return this.quotation.getOrderbook(params);
  }

  async getMarkets(isDetails: boolean = false): Promise<IMarket[]> {
    return this.quotation.getMarkets(isDetails);
  }

  async getSecondCandles(params: ISecondCandleRequest): Promise<ISecondCandle[]> {
    return this.quotation.getSecondCandles(params);
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

  async getYearCandles(params: IYearCandleRequest): Promise<IYearCandle[]> {
    return this.quotation.getYearCandles(params);
  }

  async getTradeTicks(params: ITradeTicksRequest): Promise<ITradeTick[]> {
    return this.quotation.getTradeTicks(params);
  }

  async getTickersAll(params: ITickerAllRequest): Promise<ITicker[]> {
    return this.quotation.getTickersAll(params);
  }

  async getSupportedLevels(params: ISupportedLevelsRequest): Promise<ISupportedLevels[]> {
    return this.quotation.getSupportedLevels(params);
  }
}

export { UpbitExchange, UpbitQuotation };
