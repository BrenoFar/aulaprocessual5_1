declare module 'expo-secure-store' {
    export function deleteItemAsync(key: string, options?: SecureStoreOptions): Promise<void>;
    export function getItemAsync(key: string, options?: SecureStoreOptions): Promise<string | null>;
    export function setItemAsync(key: string, value: string, options?: SecureStoreOptions): Promise<void>;
    export function isAvailableAsync(): Promise<boolean>;
  }
  
  interface SecureStoreOptions {
    keychainAccessible?: number;
  }
  