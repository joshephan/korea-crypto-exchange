import axios from 'axios';
import { IExchangeConfig } from '../../core/types';
import {
  ITickerRequest,
  ITicker,
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
} from './types';

export class BithumbQuotation {
  private config: IExchangeConfig;

  constructor(config: IExchangeConfig) {
    this.config = config;
  }

  async getMarkets(params?: IMarketRequest): Promise<IMarket[]> {
    try {
      const response = await axios.get<{ data: IMarket[] }>(
        `${this.config.serverUrl}/v1/market/all`,
        {
          params: {
            isDetails: params?.isDetails || false,
          },
        },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch markets: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getTickers(params: ITickerRequest): Promise<ITicker[]> {
    try {
      const response = await axios.get<{ data: ITicker[] }>(`${this.config.serverUrl}/v1/ticker`, {
        params,
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch tickers: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getOrderbook(params: IOrderbookRequest): Promise<IOrderbook[]> {
    try {
      const response = await axios.get<{ data: IOrderbook[] }>(
        `${this.config.serverUrl}/v1/orderbook`,
        { params },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch orderbook: ${error.response?.data?.message || error.message}`,
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
      const response = await axios.get<{ data: IMinuteCandle[] }>(
        `${this.config.serverUrl}/v1/candles/minutes/${unit}`,
        { params },
      );
      return response.data.data;
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
      const response = await axios.get<{ data: IDayCandle[] }>(
        `${this.config.serverUrl}/v1/candles/days`,
        { params },
      );
      return response.data.data;
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
      const response = await axios.get<{ data: IWeekCandle[] }>(
        `${this.config.serverUrl}/v1/candles/weeks`,
        { params },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch week candles: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getMonthCandles(params: IMonthCandleRequest): Promise<IMonthCandle[]> {
    if (params.count && (params.count < 1 || params.count > 200)) {
      throw new Error('Count must be between 1 and 200');
    }

    try {
      const response = await axios.get<{ data: IMonthCandle[] }>(
        `${this.config.serverUrl}/v1/candles/months`,
        { params },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch month candles: ${error.response?.data?.message || error.message}`,
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
      const response = await axios.get<{ data: ITradeTick[] }>(
        `${this.config.serverUrl}/v1/trades/ticks`,
        { params },
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch trade ticks: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }

  async getMarketWarnings(): Promise<IMarketWarning[]> {
    try {
      const response = await axios.get<{ data: IMarketWarning[] }>(
        `${this.config.serverUrl}/v1/market/virtual_asset_warning`,
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch market warnings: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }
}
