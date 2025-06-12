import axios from 'axios';
import { IExchangeConfig } from '../../core/types';
import {
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
  ITickerRequest,
  ITicker,
  ITickerAllRequest,
  IOrderbookRequest,
  IOrderbook,
  ISupportedLevelsRequest,
  ISupportedLevels,
} from './types';

export class UpbitQuotation {
  private config: IExchangeConfig;

  constructor(config: IExchangeConfig) {
    this.config = config;
  }

  async getMarkets(isDetails: boolean = false): Promise<IMarket[]> {
    try {
      const url = `${this.config.serverUrl}/v1/market/all${isDetails ? '?is_details=true' : ''}`;
      const response = await axios.get<IMarket[]>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch markets: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getSecondCandles(params: ISecondCandleRequest): Promise<ISecondCandle[]> {
    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const url = `${this.config.serverUrl}/v1/candles/seconds`;
      const response = await axios.get<ISecondCandle[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch second candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getMinuteCandles(unit: number, params: IMinuteCandleRequest): Promise<IMinuteCandle[]> {
    if (![1, 3, 5, 15, 10, 30, 60, 240].includes(unit)) {
      throw new Error('Unit must be one of: 1, 3, 5, 15, 10, 30, 60, 240');
    }

    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const url = `${this.config.serverUrl}/v1/candles/minutes/${unit}`;
      const response = await axios.get<IMinuteCandle[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch minute candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getDayCandles(params: IDayCandleRequest): Promise<IDayCandle[]> {
    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const url = `${this.config.serverUrl}/v1/candles/days`;
      const response = await axios.get<IDayCandle[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch day candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getWeekCandles(params: IWeekCandleRequest): Promise<IWeekCandle[]> {
    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const url = `${this.config.serverUrl}/v1/candles/weeks`;
      const response = await axios.get<IWeekCandle[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch week candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getYearCandles(params: IYearCandleRequest): Promise<IYearCandle[]> {
    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const url = `${this.config.serverUrl}/v1/candles/years`;
      const response = await axios.get<IYearCandle[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch year candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getTradeTicks(params: ITradeTicksRequest): Promise<ITradeTick[]> {
    if (params.days_ago && (params.days_ago < 1 || params.days_ago > 7)) {
      throw new Error('days_ago must be between 1 and 7');
    }

    try {
      const url = `${this.config.serverUrl}/v1/trades/ticks`;
      const response = await axios.get<ITradeTick[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch trade ticks: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getTickers(params: ITickerRequest): Promise<ITicker[]> {
    try {
      const url = `${this.config.serverUrl}/v1/ticker`;
      const response = await axios.get<ITicker[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch tickers: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getTickersAll(params: ITickerAllRequest): Promise<ITicker[]> {
    try {
      const url = `${this.config.serverUrl}/v1/ticker/all`;
      const response = await axios.get<ITicker[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch all tickers: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getOrderbook(params: IOrderbookRequest): Promise<IOrderbook[]> {
    try {
      const url = `${this.config.serverUrl}/v1/orderbook`;
      const response = await axios.get<IOrderbook[]>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch orderbook: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getSupportedLevels(params: ISupportedLevelsRequest): Promise<ISupportedLevels[]> {
    try {
      const url = `${this.config.serverUrl}/v1/orderbook/supported_levels`;
      const response = await axios.get<ISupportedLevels[]>(url, {
        params: {
          markets: params.markets.join(','),
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch supported levels: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }
}
