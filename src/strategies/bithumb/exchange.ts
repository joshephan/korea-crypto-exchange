import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';
import { IExchangeConfig, IAccount } from '../../core/types';
import {
  IPlaceOrderRequest,
  IPlaceOrderResponse,
  IOrderDetailRequest,
  IOrderDetailResponse,
  IOrderChanceRequest,
  IOrderChanceResponse,
  IOrderListRequest,
  IOrderListItem,
  ICancelOrderRequest,
  ICancelOrderResponse,
  IWithdrawListRequest,
  IWithdrawListItem,
  IWithdrawKrwListRequest,
  IWithdrawKrwListItem,
  IWithdrawDetailRequest,
  IWithdrawDetailResponse,
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
} from './types';

export class BithumbExchange {
  private config: IExchangeConfig;

  constructor(config: IExchangeConfig) {
    this.config = config;
  }
  async getApiKeys(): Promise<IApiKey[]> {
    try {
      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IApiKey[]>(`${this.config.serverUrl}/v1/api_keys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  private generateToken(query?: string): string {
    const payload: any = {
      access_key: this.config.accessKey,
      nonce: uuidv4(),
      timestamp: Date.now(),
    };

    if (query) {
      const queryHash = crypto.createHash('SHA512').update(query, 'utf-8').digest('hex');
      payload.query_hash = queryHash;
      payload.query_hash_alg = 'SHA512';
    }

    return sign(payload, this.config.secretKey);
  }

  async getAccounts(): Promise<IAccount[]> {
    try {
      const token = this.generateToken();
      const response = await axios.get<IAccount[]>(`${this.config.serverUrl}/v1/accounts`, {
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

  async placeOrder(params: IPlaceOrderRequest): Promise<IPlaceOrderResponse> {
    try {
      const query = querystring.encode(params as any);
      const token = this.generateToken(query);
      const response = await axios.post<IPlaceOrderResponse>(
        `${this.config.serverUrl}/v1/orders`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to place order: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getOrderDetail(params: IOrderDetailRequest): Promise<IOrderDetailResponse> {
    try {
      const query = querystring.encode({ uuid: params.uuid });
      const token = this.generateToken(query);
      const response = await axios.get<IOrderDetailResponse>(
        `${this.config.serverUrl}/v1/order?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async getOrderChance(params: IOrderChanceRequest): Promise<IOrderChanceResponse> {
    try {
      const query = querystring.encode({ market: params.market });
      const token = this.generateToken(query);
      const response = await axios.get<IOrderChanceResponse>(
        `${this.config.serverUrl}/v1/orders/chance?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch order chance: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getOrderList(params: IOrderListRequest): Promise<IOrderListItem[]> {
    try {
      const nonArrayParams: Record<string, string> = {};
      if (params.market) nonArrayParams.market = params.market;
      if (params.state) nonArrayParams.state = params.state;
      if (params.page) nonArrayParams.page = params.page.toString();
      if (params.limit) nonArrayParams.limit = params.limit.toString();
      if (params.order_by) nonArrayParams.order_by = params.order_by;

      let query = querystring.encode(nonArrayParams);

      if (params.uuids) {
        const uuidsQuery = params.uuids.map((uuid) => `uuids[]=${uuid}`).join('&');
        query = query ? `${query}&${uuidsQuery}` : uuidsQuery;
      }

      if (params.states) {
        const statesQuery = params.states.map((state) => `states[]=${state}`).join('&');
        query = query ? `${query}&${statesQuery}` : statesQuery;
      }

      const token = this.generateToken(query);
      const response = await axios.get<IOrderListItem[]>(
        `${this.config.serverUrl}/v1/orders?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async cancelOrder(params: ICancelOrderRequest): Promise<ICancelOrderResponse> {
    try {
      const query = querystring.encode({ uuid: params.uuid });
      const token = this.generateToken(query);
      const response = await axios.delete<ICancelOrderResponse>(
        `${this.config.serverUrl}/v1/order?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async getWithdrawList(params: IWithdrawListRequest): Promise<IWithdrawListItem[]> {
    try {
      const nonArrayParams: Record<string, string> = {};
      if (params.currency) nonArrayParams.currency = params.currency;
      if (params.state) nonArrayParams.state = params.state;
      if (params.page) nonArrayParams.page = params.page.toString();
      if (params.limit) nonArrayParams.limit = params.limit.toString();
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

      const token = this.generateToken(query);
      const response = await axios.get<IWithdrawListItem[]>(
        `${this.config.serverUrl}/v1/withdraws?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async getWithdrawKrwList(params: IWithdrawKrwListRequest): Promise<IWithdrawKrwListItem[]> {
    try {
      const nonArrayParams: Record<string, string> = {};
      if (params.state) nonArrayParams.state = params.state;
      if (params.page) nonArrayParams.page = params.page.toString();
      if (params.limit) nonArrayParams.limit = params.limit.toString();
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

      const token = this.generateToken(query);
      const response = await axios.get<IWithdrawKrwListItem[]>(
        `${this.config.serverUrl}/v1/withdraws/krw?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch KRW withdraw list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWithdrawDetail(params: IWithdrawDetailRequest): Promise<IWithdrawDetailResponse> {
    try {
      const nonArrayParams: Record<string, string> = {};
      nonArrayParams.currency = params.currency;
      if (params.uuid) nonArrayParams.uuid = params.uuid;
      if (params.txid) nonArrayParams.txid = params.txid;

      const query = querystring.encode(nonArrayParams);
      const token = this.generateToken(query);
      const response = await axios.get<IWithdrawDetailResponse>(
        `${this.config.serverUrl}/v1/withdraw?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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
    try {
      const query = querystring.encode(params as any);
      const token = this.generateToken(query);
      const response = await axios.get<IWithdrawChanceResponse>(
        `${this.config.serverUrl}/v1/withdraws/chance?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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
    try {
      const query = querystring.encode(params as any);
      const token = this.generateToken(query);
      const response = await axios.post<IWithdrawCoinResponse>(
        `${this.config.serverUrl}/v1/withdraws/coin`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
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
    try {
      const query = querystring.encode(params as any);
      const token = this.generateToken(query);
      const response = await axios.post<IWithdrawKrwResponse>(
        `${this.config.serverUrl}/v1/withdraws/krw`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
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
    try {
      const token = this.generateToken();
      const response = await axios.get<IWithdrawAddress[]>(
        `${this.config.serverUrl}/v1/withdraws/coin_addresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async getDepositKrwList(params: IDepositKrwListRequest): Promise<IDepositKrwListItem[]> {
    try {
      const nonArrayParams: Record<string, string> = {};
      if (params.state) nonArrayParams.state = params.state;
      if (params.page) nonArrayParams.page = params.page.toString();
      if (params.limit) nonArrayParams.limit = params.limit.toString();
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
        timestamp: Date.now(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IDepositKrwListItem[]>(
        `${this.config.serverUrl}/v1/deposits/krw?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch KRW deposit list: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositDetail(params: IDepositDetailRequest): Promise<IDepositDetailResponse> {
    try {
      const queryParams: Record<string, string> = {
        currency: params.currency,
      };

      if (params.uuid) queryParams.uuid = params.uuid;
      if (params.txid) queryParams.txid = params.txid;

      const query = querystring.encode(queryParams);
      const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IDepositDetailResponse>(
        `${this.config.serverUrl}/v1/deposit?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  async generateDepositAddress(
    params: IGenerateDepositAddressRequest,
  ): Promise<IGenerateDepositAddressResponse> {
    try {
      const query = querystring.encode(params as any);
      const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.post<IGenerateDepositAddressResponse>(
        `${this.config.serverUrl}/v1/deposits/generate_coin_address`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to generate deposit address: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositAddresses(): Promise<IDepositAddress[]> {
    try {
      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IDepositAddress[]>(
        `${this.config.serverUrl}/v1/deposits/coin_addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch deposit addresses: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDepositAddress(params: IGetDepositAddressRequest): Promise<IGetDepositAddressResponse> {
    try {
      const query = querystring.encode(params as any);
      const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IGetDepositAddressResponse>(
        `${this.config.serverUrl}/v1/deposits/coin_address?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
    try {
      const query = querystring.encode(params as any);
      const queryHash = crypto.createHash('sha512').update(query, 'utf-8').digest('hex');

      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
        query_hash: queryHash,
        query_hash_alg: 'SHA512',
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.post<IDepositKrwResponse>(
        `${this.config.serverUrl}/v1/deposits/krw`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to deposit KRW: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getWalletStatus(): Promise<IWalletStatus[]> {
    try {
      const payload = {
        access_key: this.config.accessKey,
        nonce: uuidv4(),
        timestamp: Date.now(),
      };

      const token = sign(payload, this.config.secretKey);

      const response = await axios.get<IWalletStatus[]>(
        `${this.config.serverUrl}/v1/status/wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
}
