import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ticktask.app',
  appName: 'TickTask',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    // 在开发时可以指向本地服务器进行调试
    // url: 'http://localhost:5000',
    // cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    // 使用WKWebView的现代功能
    limitsNavigationsToAppBoundDomains: true,
  },
  android: {
    // Android相关配置
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  },
  plugins: {
    // 状态栏配置
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff',
      overlaysWebView: false
    },
    // 启动画面配置
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;
