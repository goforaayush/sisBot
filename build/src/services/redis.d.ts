export declare function redisInit(): Promise<void>;
export declare function redisClose(): Promise<void>;
export declare function setValue(key: string, value: string): Promise<void>;
export declare function getValue(key: string): Promise<any>;
