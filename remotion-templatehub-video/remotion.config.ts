import {Config} from '@remotion/cli/config';

export const config: Config = {
  // Customize your configuration here
  setBrowserExecutable: undefined,
  setBrowserArgs: undefined,
  setPort: 3000,
  setNumberOfSharedAudioTags: 5,
  setPublicDir: './public',
  setWebpackPollingInMilliseconds: undefined,
  setShouldOpenBrowser: false,
  setChromiumDisableWebSecurity: false,
  setChromiumHeadlessMode: true,
  setChromiumIgnoreCertificateErrors: false,
  setDelayRenderTimeoutInMilliseconds: 30000,
  setBufferStateDelayInMilliseconds: undefined,
};
