import { IExchangeStrategy, IExchangeConfig, ExchangeType } from '../core/types';
import { UpbitStrategy } from '../strategies/upbit';

export class ExchangeSelector {
  private config: IExchangeConfig;

  constructor(config: IExchangeConfig) {
    this.config = config;
  }

  private getServerUrl(type: ExchangeType): string {
    switch (type) {
      case ExchangeType.UPBIT:
        return 'https://api.upbit.com';
      case ExchangeType.BITHUMB:
        return 'https://api.bithumb.com';
      default:
        throw new Error(`Unsupported exchange type: ${type}`);
    }
  }

  select(): IExchangeStrategy {
    const serverUrl = this.getServerUrl(this.config.type);

    switch (this.config.type) {
      case ExchangeType.UPBIT:
        return new UpbitStrategy({
          ...this.config,
          serverUrl,
        });
      case ExchangeType.BITHUMB:
        throw new Error('Bithumb exchange is not implemented yet');
      default:
        throw new Error(`Unsupported exchange type: ${this.config.type}`);
    }
  }
}
