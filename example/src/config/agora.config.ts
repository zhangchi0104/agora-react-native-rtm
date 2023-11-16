let env: any = '';
try {
  env = require('./env_local').default;
} catch (error) {
  console.warn(error);
}

const config = {
  // Get your own App ID at https://dashboard.agora.io/
  appId: env.appId,
  // Please refer to https://docs.agora.io/en/Agora%20Platform/token
  token: env.token || '',
  channelId: 'testdcg',
  uid: env.uid,
  logFilePath: '',
};

export default config;
