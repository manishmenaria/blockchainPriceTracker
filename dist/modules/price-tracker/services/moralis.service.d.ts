import { OnModuleInit } from '@nestjs/common';
export declare class MoralisService implements OnModuleInit {
    onModuleInit(): Promise<void>;
    getPrice(chainId: string, address: string): Promise<number>;
}
