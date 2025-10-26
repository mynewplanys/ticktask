/**
 * 应用配置文件
 * 处理Web和移动端环境的API地址配置
 */

/**
 * 检测是否运行在Capacitor原生环境中
 * 在Web开发环境中，Capacitor可能不存在，需要安全检查
 */
const isNativePlatform = (): boolean => {
  try {
    // 动态检查Capacitor是否存在（在Mac构建后才有）
    // @ts-ignore - Capacitor在Web开发时不存在
    return typeof window !== 'undefined' && 
           window.Capacitor !== undefined && 
           window.Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

/**
 * 获取API基础URL
 * - Web环境：使用相对路径（同域）
 * - Capacitor环境：使用环境变量指定的完整URL
 */
export const getApiBaseUrl = (): string => {
  // 如果是原生移动应用环境
  if (isNativePlatform()) {
    // 从环境变量读取API地址
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (!apiUrl) {
      console.warn('⚠️ VITE_API_URL未配置，使用默认本地地址');
      return 'http://localhost:5000';
    }
    
    return apiUrl;
  }
  
  // Web环境使用相对路径
  return '';
};

// 导出配置
export const API_BASE_URL = getApiBaseUrl();

// 其他应用配置
export const APP_CONFIG = {
  name: 'TickTask',
  version: '1.0.0',
  defaultLanguage: 'zh',
  supportedLanguages: ['zh', 'en'],
} as const;
