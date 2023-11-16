import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'agora-react-native-rtm' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const AgoraModule = isTurboModuleEnabled
  ? require('./NativeAgoraRtmNg').default
  : NativeModules.AgoraRtmNg;

const AgoraRtmNg = AgoraModule
  ? AgoraModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
export default AgoraRtmNg;
