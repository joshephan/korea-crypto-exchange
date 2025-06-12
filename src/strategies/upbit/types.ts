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
  trades: IOrderTrade[];
  time_in_force?: string;
  identifier?: string;
}

export interface IOrderListRequest {
  uuids?: string[];
  identifiers?: string[];
  market?: string;
  order_by?: 'asc' | 'desc';
}

export interface IOrderListItem {
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
  executed_funds: string;
  trades_count: number;
  time_in_force?: string;
  identifier?: string;
}

export interface IClosedOrderRequest {
  market?: string;
  state?: 'done' | 'cancel';
  states?: ('done' | 'cancel')[];
  start_time?: string;
  end_time?: string;
  limit?: number;
  order_by?: 'asc' | 'desc';
}

export interface IClosedOrderResponse {
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
  executed_funds: string;
  trades_count: number;
  time_in_force?: string;
  identifier?: string;
}

export interface ICancelOrderRequest {
  uuid?: string;
  identifier?: string;
}

export interface ICancelOrderResponse {
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
  identifier?: string;
}

export interface IBulkCancelOrderRequest {
  cancel_side?: 'all' | 'ask' | 'bid';
  pairs?: string;
  excluded_pairs?: string;
  quote_currencies?: string;
  count?: number;
  order_by?: 'asc' | 'desc';
}

export interface IBulkCancelOrderSuccess {
  count: number;
  orders: Array<{
    uuid: string;
    market: string;
    identifier?: string;
  }>;
}

export interface IBulkCancelOrderFailed {
  count: number;
  orders: Array<{
    uuid: string;
    market: string;
    identifier?: string;
  }>;
}

export interface IBulkCancelOrderResponse {
  success: IBulkCancelOrderSuccess;
  failed: IBulkCancelOrderFailed;
}

export interface ICancelOrderListRequest {
  uuids?: string[];
  identifiers?: string[];
}

export interface ICancelOrderListSuccess {
  count: number;
  orders: Array<{
    uuid: string;
    market: string;
    identifier?: string;
  }>;
}

export interface ICancelOrderListFailed {
  count: number;
  orders: Array<{
    uuid: string;
    market: string;
    identifier?: string;
  }>;
}

export interface ICancelOrderListResponse {
  success: ICancelOrderListSuccess;
  failed: ICancelOrderListFailed;
}

export interface IPlaceOrderRequest {
  market: string;
  side: 'bid' | 'ask';
  volume?: string;
  price?: string;
  ord_type: 'limit' | 'price' | 'market' | 'best';
  identifier?: string;
  time_in_force?: 'ioc' | 'fok';
}

export interface IPlaceOrderResponse {
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
  time_in_force?: string;
  identifier?: string;
}

export interface ICancelAndNewOrderRequest {
  prev_order_uuid?: string;
  prev_order_identifier?: string;
  new_ord_type: 'limit' | 'price' | 'market' | 'best';
  new_volume: string | 'remain_only';
  new_price: string;
  new_identifier?: string;
  new_time_in_force?: 'ioc' | 'fok';
}

export interface ICancelAndNewOrderResponse {
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
  time_in_force?: string;
  identifier?: string;
  new_order_uuid: string;
  new_order_identifier?: string;
}

export interface IWithdrawListRequest {
  currency?: string;
  state?: 'WAITING' | 'PROCESSING' | 'DONE' | 'FAILED' | 'CANCELLED' | 'REJECTED';
  uuids?: string[];
  txids?: string[];
  limit?: number;
  page?: number;
  order_by?: 'asc' | 'desc';
}

export interface IWithdrawListItem {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string;
  state: 'WAITING' | 'PROCESSING' | 'DONE' | 'FAILED' | 'CANCELLED' | 'REJECTED';
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: 'default' | 'internal';
  is_cancelable: boolean;
}

export interface IWithdrawDetailRequest {
  uuid?: string;
  txid?: string;
  currency?: string;
}

export interface IWithdrawDetailResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string | null;
  state: 'WAITING' | 'PROCESSING' | 'DONE' | 'FAILED' | 'CANCELLED' | 'REJECTED';
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: 'default' | 'internal';
  is_cancelable: boolean;
}

export interface IWithdrawChanceRequest {
  currency: string;
  net_type?: string;
}

export interface IWithdrawChanceResponse {
  member_level: {
    security_level: number;
    fee_level: number;
    email_verified: boolean;
    identity_auth_verified: boolean;
    bank_account_verified: boolean;
    two_factor_auth_verified: boolean;
    locked: boolean;
    wallet_locked: boolean;
  };
  currency: {
    code: string;
    withdraw_fee: string;
    is_coin: boolean;
    wallet_state: string;
    wallet_support: string[];
  };
  account: {
    currency: string;
    balance: string;
    locked: string;
    avg_buy_price: string;
    avg_buy_price_modified: boolean;
    unit_currency: string;
  };
  withdraw_limit: {
    currency: string;
    minimum: string;
    onetime: string;
    daily: string | null;
    remaining_daily: string;
    remaining_daily_krw: string;
    remaining_daily_fiat: string;
    fiat_currency: string;
    withdraw_delayed_fiat: string;
    fixed: number;
    can_withdraw: boolean;
  };
}

export interface IWithdrawCoinRequest {
  currency: string;
  net_type: string;
  amount: string;
  address: string;
  secondary_address?: string;
  transaction_type?: 'default' | 'internal';
}

export interface IWithdrawCoinResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  krw_amount: string;
  transaction_type: string;
  is_cancelable: boolean;
}

export interface IWithdrawKrwRequest {
  amount: string;
  two_factor_type: 'kakao' | 'naver' | 'hana';
}

export interface IWithdrawKrwResponse {
  type: string;
  uuid: string;
  currency: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: string;
  is_cancelable: boolean;
}

export interface IWithdrawAddress {
  currency: string;
  net_type: string;
  network_name: string;
  withdraw_address: string;
  secondary_address: string | null;
}

export interface ICancelWithdrawCoinRequest {
  uuid: string;
}

export interface ICancelWithdrawCoinResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string | null;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: string;
  is_cancelable: boolean;
}

export interface IDepositListRequest {
  currency?: string;
  state?: 'ACCEPTED' | 'PROCESSING' | 'DONE' | 'FAILED' | 'CANCELLED' | 'REJECTED';
  uuids?: string[];
  txids?: string[];
  limit?: number;
  page?: number;
  order_by?: 'asc' | 'desc';
}

export interface IDepositListItem {
  type: string;
  uuid: string;
  currency: string;
  txid: string;
  state: 'ACCEPTED' | 'PROCESSING' | 'DONE' | 'FAILED' | 'CANCELLED' | 'REJECTED';
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: 'default' | 'internal';
}

export interface IDepositDetailRequest {
  uuid?: string;
  txid?: string;
  currency?: string;
}

export interface IDepositDetailResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state:
    | 'PROCESSING'
    | 'ACCEPTED'
    | 'CANCELLED'
    | 'REJECTED'
    | 'TRAVEL_RULE_SUSPECTED'
    | 'REFUNDING'
    | 'REFUNDED';
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: 'default' | 'internal';
}

export interface IGenerateDepositAddressRequest {
  currency: string;
  net_type: string;
}

export interface IGenerateDepositAddressResponse {
  success: boolean;
  message: string;
}

export interface IDepositAddress {
  currency: string;
  deposit_address: string;
  secondary_address: string | null;
}

export interface IGetDepositAddressRequest {
  currency: string;
  net_type: string;
}

export interface IGetDepositAddressResponse {
  currency: string;
  net_type: string;
  deposit_address: string;
  secondary_address: string | null;
}

export interface IDepositKrwRequest {
  amount: string;
  two_factor_type: 'kakao' | 'naver' | 'hana';
}

export interface IDepositKrwResponse {
  type: string;
  uuid: string;
  currency: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: string;
}

export interface ITravelRuleVasp {
  vasp_name: string;
  vasp_uuid: string;
  depositable: boolean;
  withdrawable: boolean;
}

export interface ITravelRuleDepositUuidRequest {
  deposit_uuid: string;
  vasp_uuid: string;
}

export interface ITravelRuleDepositUuidResponse {
  deposit_uuid: string;
  deposit_state: string;
  verification_result: string;
}

export interface ITravelRuleDepositTxidRequest {
  vasp_uuid: string;
  txid: string;
  currency: string;
  net_type: string;
}

export interface ITravelRuleDepositTxidResponse {
  deposit_uuid: string;
  deposit_state: string;
  verification_result: string;
}

export interface IDepositChanceCoinRequest {
  currency: string;
  net_type: string;
}

export interface IDepositChanceCoinResponse {
  currency: string;
  net_type: string;
  is_deposit_possible: boolean;
  deposit_impossible_reason: string | null;
  minimum_deposit_amount: number;
  minimum_deposit_confirmations: number;
  decimal_precision: number;
}

export interface IWalletStatus {
  currency: string;
  wallet_state: 'working' | 'withdraw_only' | 'deposit_only' | 'paused' | 'unsupported';
  block_state: 'normal' | 'delayed' | 'inactive' | null;
  block_height: number | null;
  block_updated_at: string | null;
  block_elapsed_minutes: number | null;
  net_type: string;
  network_name: string;
}

export interface IApiKey {
  access_key: string;
  expire_at: string;
}

export interface IMarketEventCaution {
  PRICE_FLUCTUATIONS: boolean;
  TRADING_VOLUME_SOARING: boolean;
  DEPOSIT_AMOUNT_SOARING: boolean;
  GLOBAL_PRICE_DIFFERENCES: boolean;
  CONCENTRATION_OF_SMALL_ACCOUNTS: boolean;
}

export interface IMarketEvent {
  warning: boolean;
  caution: IMarketEventCaution;
}

export interface IMarket {
  market: string;
  korean_name: string;
  english_name: string;
  market_event?: IMarketEvent;
}

export interface ISecondCandleRequest {
  market: string;
  to?: string;
  count?: number;
}

export interface ISecondCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

export interface IMinuteCandleRequest {
  market: string;
  to?: string;
  count?: number;
}

export interface IMinuteCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

export interface IDayCandleRequest {
  market: string;
  to?: string;
  count?: number;
  converting_price_unit?: string;
}

export interface IDayCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
  converted_trade_price?: number;
}

export interface IWeekCandleRequest {
  market: string;
  to?: string;
  count?: number;
}

export interface IWeekCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  first_day_of_period: string;
}

export interface IMonthCandleRequest {
  market: string;
  to?: string;
  count?: number;
}

export interface IMonthCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  first_day_of_period: string;
}

export interface IYearCandleRequest {
  market: string;
  to?: string;
  count?: number;
}

export interface IYearCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  first_day_of_period: string;
}

export interface ITradeTicksRequest {
  market: string;
  to?: string;
  count?: number;
  cursor?: string;
  days_ago?: number;
}

export interface ITradeTick {
  market: string;
  trade_date_utc: string;
  trade_time_utc: string;
  timestamp: number;
  trade_price: number;
  trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  ask_bid: 'ASK' | 'BID';
  sequential_id: number;
}

export interface ITickerRequest {
  markets: string;
}

export interface ITicker {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: 'EVEN' | 'RISE' | 'FALL';
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface ITickerAllRequest {
  quote_currencies?: string;
}

export interface IOrderbookRequest {
  markets: string;
  level?: number;
}

export interface IOrderbookUnit {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}

export interface IOrderbook {
  market: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: IOrderbookUnit[];
  level: number;
}

export interface ISupportedLevelsRequest {
  markets: string[];
}

export interface ISupportedLevels {
  market: string;
  supported_levels: number[];
}
