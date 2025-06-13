export interface IPlaceOrderRequest {
  market: string;
  side: 'bid' | 'ask';
  volume: string;
  price: string;
  ord_type: 'limit' | 'price' | 'market';
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
  change: 'RISE' | 'EVEN' | 'FALL';
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

export interface IOrderbookRequest {
  markets: string;
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
}

export interface IAccount {
  currency: string;
  balance: string;
  locked: string;
  avg_buy_price: string;
  avg_buy_price_modified: boolean;
  unit_currency: string;
}

export interface IOrderDetailRequest {
  uuid: string;
}

export interface IOrderTrade {
  market: string;
  uuid: string;
  price: string;
  volume: string;
  funds: string;
  side: string;
  created_at: string;
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
}

export interface IMarket {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning?: string;
}

export interface IMarketRequest {
  isDetails?: boolean;
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
  convertingPriceUnit?: string;
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

export interface IMarketWarning {
  market: string;
  warning_type:
    | 'PRICE_SUDDEN_FLUCTUATION'
    | 'TRADING_VOLUME_SUDDEN_FLUCTUATION'
    | 'DEPOSIT_AMOUNT_SUDDEN_FLUCTUATION'
    | 'PRICE_DIFFERENCE_HIGH'
    | 'SPECIFIC_ACCOUNT_HIGH_TRANSACTION'
    | 'EXCHANGE_TRADING_CONCENTRATION';
  end_date: string;
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
      price_unit: string;
      min_total: string;
    };
    ask: {
      currency: string;
      price_unit: string;
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

export interface IOrderListRequest {
  market?: string;
  uuids?: string[];
  state?: 'wait' | 'watch' | 'done' | 'cancel';
  states?: ('wait' | 'watch' | 'done' | 'cancel')[];
  page?: number;
  limit?: number;
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
  trades_count: number;
}

export interface ICancelOrderRequest {
  uuid: string;
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
}

export interface IWithdrawListRequest {
  currency?: string;
  state?: 'PROCESSING' | 'DONE' | 'CANCELED';
  uuids?: string[];
  txids?: string[];
  page?: number;
  limit?: number;
  order_by?: 'asc' | 'desc';
}

export interface IWithdrawListItem {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string | null;
}

export interface IWithdrawKrwListRequest {
  state?: 'PROCESSING' | 'DONE' | 'CANCELED';
  uuids?: string[];
  txids?: string[];
  page?: number;
  limit?: number;
  order_by?: 'asc' | 'desc';
}

export interface IWithdrawKrwListItem {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string;
}

export interface IWithdrawDetailRequest {
  currency: string;
  uuid?: string;
  txid?: string;
}

export interface IWithdrawDetailResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string | null;
}

export interface IWithdrawChanceRequest {
  currency: string;
  net_type: string;
}

export interface IMemberLevel {
  security_level: number | null;
  fee_level: number | null;
  email_verified: boolean | null;
  identity_auth_verified: boolean | null;
  bank_account_verified: boolean | null;
  two_factor_auth_verified: boolean | null;
  locked: boolean | null;
  wallet_locked: boolean | null;
}

export interface ICurrencyInfo {
  code: string;
  withdraw_fee: string;
  is_coin: boolean;
  wallet_state: string;
  wallet_support: string[];
}

export interface IAccountInfo {
  currency: string;
  balance: string;
  locked: string;
  avg_buy_price: string;
  avg_buy_price_modified: boolean;
  unit_currency: string;
}

export interface IWithdrawLimit {
  currency: string;
  onetime: string;
  daily: string;
  remaining_daily: string;
  remaining_daily_fiat: string | null;
  fiat_currency: string | null;
  minimum: string;
  fixed: number;
  withdraw_delayed_fiat: string | null;
  can_withdraw: boolean;
  remaining_daily_krw: string | null;
}

export interface IWithdrawChanceResponse {
  member_level: IMemberLevel;
  currency: ICurrencyInfo;
  account: IAccountInfo;
  withdraw_limit: IWithdrawLimit;
}

export interface IWithdrawCoinRequest {
  currency: string;
  net_type: string;
  amount: number;
  address: string;
  secondary_address?: string;
  exchange_name?: string;
  receiver_type?: 'personal' | 'corporation';
  receiver_ko_name?: string;
  receiver_en_name?: string;
  receiver_corp_ko_name?: string;
  receiver_corp_en_name?: string;
}

export interface IWithdrawCoinResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  krw_amount: string;
  transaction_type: string | null;
  txid: string | null;
}

export interface IWithdrawKrwRequest {
  amount: number;
  two_factor_type: 'kakao' | 'naver' | 'hana';
}

export interface IWithdrawKrwResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: string;
}

export interface IWithdrawAddress {
  currency: string;
  net_type: string;
  network_name: string;
  withdraw_address: string;
  secondary_address: string | null;
  exchange_name: string;
  owner_type: 'personal' | 'corporation';
  owner_ko_name: string | null;
  owner_en_name: string | null;
  owner_corp_ko_name: string | null;
  owner_corp_en_name: string | null;
}

export interface IDepositListRequest {
  currency?: string;
  state?:
    | 'REQUESTED_PENDING'
    | 'REQUESTED_SYSTEM_REJECTED'
    | 'REQUESTED_PROCESSING'
    | 'REQUESTED_ADMIN_REJECTED'
    | 'DEPOSIT_PROCESSING'
    | 'DEPOSIT_ACCEPTED'
    | 'DEPOSIT_CANCELLED'
    | 'REFUNDING_PENDING'
    | 'REFUNDING_SYSTEM_REJECTED'
    | 'REFUNDING_PROCESSING'
    | 'REFUNDING_ADMIN_REJECTED'
    | 'REFUNDING_ACCEPTED'
    | 'REFUNDED_PROCESSING'
    | 'REFUNDED_ACCEPTED'
    | 'REFUNDED_CANCELLED';
  uuids?: string[];
  txids?: string[];
  page?: number;
  limit?: number;
  order_by?: 'asc' | 'desc';
}

export interface IDepositListItem {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string | null;
}

export interface IDepositKrwListRequest {
  state?: 'PROCESSING' | 'ACCEPTED' | 'CANCELED';
  uuids?: string[];
  txids?: string[];
  page?: number;
  limit?: number;
  order_by?: 'asc' | 'desc';
}

export interface IDepositKrwListItem {
  type: string;
  uuid: string;
  currency: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string;
}

export interface IDepositDetailRequest {
  currency: string;
  uuid?: string;
  txid?: string;
}

export interface IDepositDetailResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string;
  txid: string;
  state: string;
  created_at: string;
  done_at: string;
  amount: string;
  fee: string;
  transaction_type: string | null;
}

export interface IGenerateDepositAddressRequest {
  currency: string;
  net_type: string;
}

export interface IGenerateDepositAddressResponse {
  currency: string;
  net_type: string;
  deposit_address: string;
  secondary_address: string | null;
}

export interface IDepositAddress {
  currency: string;
  net_type: string;
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
}

export interface IDepositKrwRequest {
  amount: string;
  two_factor_type: 'kakao' | 'naver' | 'hana';
}

export interface IDepositKrwResponse {
  type: string;
  uuid: string;
  currency: string;
  net_type: string | null;
  txid: string;
  state: string;
  created_at: string;
  done_at: string | null;
  amount: string;
  fee: string;
  transaction_type: string;
}

export interface IWalletStatus {
  currency: string;
  wallet_state: 'working' | 'withdraw_only' | 'deposit_only' | 'paused';
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
