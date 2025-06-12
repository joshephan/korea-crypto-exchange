import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';
import { IExchangeConfig, IAccount } from '../../core/types';
import {
  IOrderChanceRequest,
  IOrderChanceResponse,
  IOrderDetailRequest,
  IOrderDetailResponse,
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
  IPlaceOrderRequest,
  IPlaceOrderResponse,
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
} from './types';

export class UpbitExchange {
  private config: IExchangeConfig;

  constructor(config: IExchangeConfig) {
    this.config = config;
  }

  private generateToken(): string {
    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
    };

    return sign(payload, this.config.secretKey);
  }

  async getAccounts(): Promise<IAccount[]> {
    try {
      const token = this.generateToken();
      const response = await axios.get(`${this.config.serverUrl}/v1/accounts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch accounts: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getOrderChance(params: IOrderChanceRequest): Promise<IOrderChanceResponse> {
    const query = querystring.encode({ market: params.market });
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/chance?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get<IOrderChanceResponse>(url, { headers });
    return response.data;
  }

  async getOrderDetail(params: IOrderDetailRequest): Promise<IOrderDetailResponse> {
    if (!params.uuid && !params.identifier) {
      throw new Error('Either uuid or identifier must be provided');
    }

    const queryParams: Record<string, string> = {};
    if (params.uuid) queryParams.uuid = params.uuid;
    if (params.identifier) queryParams.identifier = params.identifier;

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/order?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IOrderDetailResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch order detail: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getOrderList(params: IOrderListRequest): Promise<IOrderListItem[]> {
    if (!params.uuids && !params.identifiers) {
      throw new Error('Either uuids or identifiers must be provided');
    }

    if (params.uuids && params.identifiers) {
      throw new Error('Cannot provide both uuids and identifiers');
    }

    if (params.uuids && params.uuids.length > 100) {
      throw new Error('Maximum 100 uuids can be requested at once');
    }

    if (params.identifiers && params.identifiers.length > 100) {
      throw new Error('Maximum 100 identifiers can be requested at once');
    }

    let query: string;
    if (params.uuids) {
      query = params.uuids.map((uuid) => `uuids[]=${uuid}`).join('&');
    } else {
      query = params.identifiers!.map((id) => `identifiers[]=${id}`).join('&');
    }

    if (params.market) {
      query += `&market=${params.market}`;
    }

    if (params.order_by) {
      query += `&order_by=${params.order_by}`;
    }

    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/uuids?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IOrderListItem[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch order list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getClosedOrders(params: IClosedOrderRequest): Promise<IClosedOrderResponse[]> {
    if (params.state && params.states) {
      throw new Error('Cannot provide both state and states');
    }

    if (params.limit && (params.limit < 1 || params.limit > 1000)) {
      throw new Error('Limit must be between 1 and 1000');
    }

    const nonArrayParams: Record<string, string> = {};
    if (params.market) nonArrayParams.market = params.market;
    if (params.state) nonArrayParams.state = params.state;
    if (params.start_time) nonArrayParams.start_time = params.start_time;
    if (params.end_time) nonArrayParams.end_time = params.end_time;
    if (params.limit) nonArrayParams.limit = params.limit.toString();
    if (params.order_by) nonArrayParams.order_by = params.order_by;

    let query = querystring.encode(nonArrayParams);

    if (params.states) {
      const statesQuery = params.states.map((state) => `states[]=${state}`).join('&');
      query = query ? `${query}&${statesQuery}` : statesQuery;
    }

    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/closed?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IClosedOrderResponse[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch closed orders: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async cancelOrder(params: ICancelOrderRequest): Promise<ICancelOrderResponse> {
    if (!params.uuid && !params.identifier) {
      throw new Error('Either uuid or identifier must be provided');
    }

    const queryParams: Record<string, string> = {};
    if (params.uuid) queryParams.uuid = params.uuid;
    if (params.identifier) queryParams.identifier = params.identifier;

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/order?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.delete<ICancelOrderResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to cancel order: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async bulkCancelOrders(params: IBulkCancelOrderRequest): Promise<IBulkCancelOrderResponse> {
    if (params.pairs && params.quote_currencies) {
      throw new Error('Cannot provide both pairs and quote_currencies');
    }

    if (params.count && (params.count < 1 || params.count > 300)) {
      throw new Error('Count must be between 1 and 300');
    }

    if (params.pairs && params.pairs.split(',').length > 20) {
      throw new Error('Maximum 20 pairs can be specified');
    }

    if (params.excluded_pairs && params.excluded_pairs.split(',').length > 20) {
      throw new Error('Maximum 20 excluded pairs can be specified');
    }

    const queryParams: Record<string, string> = {};
    if (params.cancel_side) queryParams.cancel_side = params.cancel_side;
    if (params.pairs) queryParams.pairs = params.pairs;
    if (params.excluded_pairs) queryParams.excluded_pairs = params.excluded_pairs;
    if (params.quote_currencies) queryParams.quote_currencies = params.quote_currencies;
    if (params.count) queryParams.count = params.count.toString();
    if (params.order_by) queryParams.order_by = params.order_by;

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/open?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.delete<IBulkCancelOrderResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to bulk cancel orders: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async cancelOrderList(params: ICancelOrderListRequest): Promise<ICancelOrderListResponse> {
    if (!params.uuids && !params.identifiers) {
      throw new Error('Either uuids or identifiers must be provided');
    }

    if (params.uuids && params.identifiers) {
      throw new Error('Cannot provide both uuids and identifiers');
    }

    if (params.uuids && params.uuids.length > 20) {
      throw new Error('Maximum 20 uuids can be requested at once');
    }

    if (params.identifiers && params.identifiers.length > 20) {
      throw new Error('Maximum 20 identifiers can be requested at once');
    }

    const queryParams: Record<string, string[]> = {};
    if (params.uuids) {
      queryParams['uuids[]'] = params.uuids;
    } else {
      queryParams['identifiers[]'] = params.identifiers!;
    }

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/uuids?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.delete<ICancelOrderListResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to cancel order list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    // 시장가 주문 유효성 검사
    if (params.ord_type === 'price') {
      if (params.side !== 'bid') {
        throw new Error('Price order type is only available for bid orders');
      }
      if (params.volume) {
        throw new Error('Volume should not be provided for price order type');
      }
      if (!params.price) {
        throw new Error('Price is required for price order type');
      }
    } else if (params.ord_type === 'market') {
      if (params.side !== 'ask') {
        throw new Error('Market order type is only available for ask orders');
      }
      if (!params.volume) {
        throw new Error('Volume is required for market order type');
      }
      if (params.price) {
        throw new Error('Price should not be provided for market order type');
      }
    } else if (params.ord_type === 'limit') {
      if (!params.volume || !params.price) {
        throw new Error('Both volume and price are required for limit order type');
      }
    } else if (params.ord_type === 'best') {
      if (!params.time_in_force) {
        throw new Error('time_in_force is required for best order type');
      }
      if (params.side === 'bid') {
        if (params.volume) {
          throw new Error('Volume should not be provided for best bid order type');
        }
        if (!params.price) {
          throw new Error('Price is required for best bid order type');
        }
      } else {
        if (!params.volume) {
          throw new Error('Volume is required for best ask order type');
        }
        if (params.price) {
          throw new Error('Price should not be provided for best ask order type');
        }
      }
    }

    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<IPlaceOrderResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to place order: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async cancelAndNewOrder(params: ICancelAndNewOrderRequest): Promise<ICancelAndNewOrderResponse> {
    if (!params.prev_order_uuid && !params.prev_order_identifier) {
      throw new Error('Either prev_order_uuid or prev_order_identifier must be provided');
    }

    if (params.prev_order_uuid && params.prev_order_identifier) {
      throw new Error('Cannot provide both prev_order_uuid and prev_order_identifier');
    }

    if (params.new_ord_type === 'price') {
      if (params.new_volume !== 'remain_only') {
        throw new Error('Volume should be remain_only for price order type');
      }
      if (!params.new_price) {
        throw new Error('Price is required for price order type');
      }
    } else if (params.new_ord_type === 'market') {
      if (params.new_volume === 'remain_only') {
        throw new Error('Volume cannot be remain_only for market order type');
      }
      if (params.new_price) {
        throw new Error('Price should not be provided for market order type');
      }
    } else if (params.new_ord_type === 'limit') {
      if (!params.new_price) {
        throw new Error('Price is required for limit order type');
      }
    } else if (params.new_ord_type === 'best') {
      if (!params.new_time_in_force) {
        throw new Error('time_in_force is required for best order type');
      }
    }

    const queryParams = querystring.unescape(querystring.encode(params as any));
    const queryHash = crypto.createHash('sha512').update(queryParams, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/orders/cancel_and_new`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<ICancelAndNewOrderResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to cancel and new order: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWithdrawList(params: IWithdrawListRequest): Promise<IWithdrawListItem[]> {
    if (params.limit && (params.limit < 1 || params.limit > 100)) {
      throw new Error('Limit must be between 1 and 100');
    }

    const nonArrayParams: Record<string, string> = {};
    if (params.currency) nonArrayParams.currency = params.currency;
    if (params.state) nonArrayParams.state = params.state;
    if (params.limit) nonArrayParams.limit = params.limit.toString();
    if (params.page) nonArrayParams.page = params.page.toString();
    if (params.order_by) nonArrayParams.order_by = params.order_by;

    let query = querystring.encode(nonArrayParams);

    if (params.uuids) {
      const uuidsQuery = params.uuids.map((uuid) => `uuids[]=${uuid}`).join('&');
      query = query ? `${query}&${uuidsQuery}` : uuidsQuery;
    }

    if (params.txids) {
      const txidsQuery = params.txids.map((txid) => `txids[]=${txid}`).join('&');
      query = query ? `${query}&${txidsQuery}` : txidsQuery;
    }

    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IWithdrawListItem[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch withdraw list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWithdrawDetail(params: IWithdrawDetailRequest): Promise<IWithdrawDetailResponse> {
    if (!params.uuid && !params.txid && !params.currency) {
      throw new Error('At least one of uuid, txid, or currency must be provided');
    }

    const queryParams: Record<string, string> = {};
    if (params.uuid) queryParams.uuid = params.uuid;
    if (params.txid) queryParams.txid = params.txid;
    if (params.currency) queryParams.currency = params.currency;

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraw?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IWithdrawDetailResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch withdraw detail: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWithdrawChance(params: IWithdrawChanceRequest): Promise<IWithdrawChanceResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws/chance?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IWithdrawChanceResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch withdraw chance: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async withdrawCoin(params: IWithdrawCoinRequest): Promise<IWithdrawCoinResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws/coin`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<IWithdrawCoinResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to withdraw coin: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async withdrawKrw(params: IWithdrawKrwRequest): Promise<IWithdrawKrwResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws/krw`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<IWithdrawKrwResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to withdraw KRW: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWithdrawAddresses(): Promise<IWithdrawAddress[]> {
    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws/coin_addresses`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IWithdrawAddress[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch withdraw addresses: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async cancelWithdrawCoin(
    params: ICancelWithdrawCoinRequest,
  ): Promise<ICancelWithdrawCoinResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/withdraws/coin?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.delete<ICancelWithdrawCoinResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to cancel withdraw coin: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositList(params: IDepositListRequest): Promise<IDepositListItem[]> {
    if (params.limit && (params.limit < 1 || params.limit > 100)) {
      throw new Error('Limit must be between 1 and 100');
    }

    const nonArrayParams: Record<string, string> = {};
    if (params.currency) nonArrayParams.currency = params.currency;
    if (params.state) nonArrayParams.state = params.state;
    if (params.limit) nonArrayParams.limit = params.limit.toString();
    if (params.page) nonArrayParams.page = params.page.toString();
    if (params.order_by) nonArrayParams.order_by = params.order_by;

    let query = querystring.encode(nonArrayParams);

    if (params.uuids) {
      const uuidsQuery = params.uuids.map((uuid) => `uuids[]=${uuid}`).join('&');
      query = query ? `${query}&${uuidsQuery}` : uuidsQuery;
    }

    if (params.txids) {
      const txidsQuery = params.txids.map((txid) => `txids[]=${txid}`).join('&');
      query = query ? `${query}&${txidsQuery}` : txidsQuery;
    }

    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/deposits?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IDepositListItem[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch deposit list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositDetail(params: IDepositDetailRequest): Promise<IDepositDetailResponse> {
    if (!params.uuid && !params.txid && !params.currency) {
      throw new Error('At least one of uuid, txid, or currency must be provided');
    }

    const queryParams: Record<string, string> = {};
    if (params.uuid) queryParams.uuid = params.uuid;
    if (params.txid) queryParams.txid = params.txid;
    if (params.currency) queryParams.currency = params.currency;

    const query = querystring.encode(queryParams);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/deposit?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IDepositDetailResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch deposit detail: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositAddress(params: IGetDepositAddressRequest): Promise<IGetDepositAddressResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/deposits/coin_address?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IGetDepositAddressResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch deposit address: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async depositKrw(params: IDepositKrwRequest): Promise<IDepositKrwResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/deposits/krw`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<IDepositKrwResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to deposit KRW: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async verifyTravelRuleDepositUuid(
    params: ITravelRuleDepositUuidRequest,
  ): Promise<ITravelRuleDepositUuidResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/travel_rule/deposit/uuid`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<ITravelRuleDepositUuidResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to verify travel rule deposit UUID: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async verifyTravelRuleDepositTxid(
    params: ITravelRuleDepositTxidRequest,
  ): Promise<ITravelRuleDepositTxidResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/travel_rule/deposit/txid`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post<ITravelRuleDepositTxidResponse>(url, params, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to verify travel rule deposit TxID: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositChanceCoin(
    params: IDepositChanceCoinRequest,
  ): Promise<IDepositChanceCoinResponse> {
    const query = querystring.encode(params as any);
    const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/deposits/chance/coin?${query}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IDepositChanceCoinResponse>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch deposit chance coin: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWalletStatus(): Promise<IWalletStatus[]> {
    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/status/wallet`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IWalletStatus[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch wallet status: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getApiKeys(): Promise<IApiKey[]> {
    const payload = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
    };

    const token = sign(payload, this.config.secretKey);

    const url = `${this.config.serverUrl}/v1/api_keys`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get<IApiKey[]>(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch API keys: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }
}
