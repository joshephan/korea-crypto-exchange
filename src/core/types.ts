import { IPlaceOrderRequest, IPlaceOrderResponse } from '../strategies/upbit/types';

export interface IQuotation {
  getPrice(symbol: string): Promise<number>;
}

export interface IWebSocket {
  connect(): void;
  disconnect(): void;
}

export interface IExchangeStrategy {
  placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse>;
}

export enum ExchangeType {
  UPBIT = 'upbit',
  BITHUMB = 'bithumb',
}

export interface IAccount {
  currency: string;
  balance: string;
  locked: string;
  avg_buy_price: string;
  avg_buy_price_modified: boolean;
  unit_currency: string;
}

export interface IExchangeConfig {
  type: ExchangeType;
  accessKey: string;
  secretKey: string;
  serverUrl: string;
}

export interface IOrderChanceRequest {
  market: string;
}

export interface IOrderChanceResponse {
  bid_fee: string;
  ask_fee: string;
  maker_bid_fee: string;
  maker_ask_fee: string;
  market: {
    id: string;
    name: string;
    order_types: string[];
    order_sides: string[];
    bid_types: string[];
    ask_types: string[];
    bid: {
      currency: string;
      min_total: string;
    };
    ask: {
      currency: string;
      min_total: string;
    };
    max_total: string;
    state: string;
  };
  bid_account: {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
  };
  ask_account: {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
  };
}

export interface IOrderDetailRequest {
  uuid?: string;
  identifier?: string;
}

export interface IOrderTrade {
  market: string;
  uuid: string;
  price: string;
  volume: string;
  funds: string;
  side: string;
  created_at?: string;
}

export interface IOrderDetailResponse {
  uuid: string;
  side: string;
  ord_type: string;
  price: string;
  state: string;
  market: string;
  created_at: string;
  volume: string;
  remaining_volume: string;
  reserved_fee: string;
  remaining_fee: string;
  paid_fee: string;
  locked: string;
  executed_volume: string;
  trades_count: number;
  trades: Array<{
    market: string;
    uuid: string;
    price: string;
    volume: string;
    funds: string;
    side: string;
    created_at?: string;
  }>;
  time_in_force?: string;
  identifier?: string;
}
