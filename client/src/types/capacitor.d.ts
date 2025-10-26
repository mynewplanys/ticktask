/**
 * Capacitor类型声明
 * 这些类型在Web开发环境中不存在，但在iOS/Android构建后会自动注入
 */

interface CapacitorGlobal {
  isNativePlatform(): boolean;
  getPlatform(): string;
  convertFileSrc(filePath: string): string;
}

interface Window {
  Capacitor?: CapacitorGlobal;
}
