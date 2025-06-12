import { IExchangeStrategy, IExchangeConfig, IOrderDetailRequest } from '../../core/types';
import { UpbitExchange } from './exchange';
import { UpbitQuotation } from './quotation';
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  ITickerRequest,
  IOrderbookRequest,
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

  // UpbitQuotation 메서드 위임
  async getTickers(params: ITickerRequest) {
    return this.quotation.getTickers(params);
  }

  async getOrderbook(params: IOrderbookRequest) {
    return this.quotation.getOrderbook(params);
  }
}

export { UpbitExchange, UpbitQuotation };
