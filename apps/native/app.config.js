const app = require('./app.json');

/** Staging installs beside production, matching the store records. */
module.exports = () => {
  const expo = app.expo;
  if (process.env.APP_VARIANT !== 'staging') return expo;

  return {
    ...expo,
    name: 'CROS Owner Staging',
    scheme: 'crossubownerstaging',
    ios: {
      ...expo.ios,
      bundleIdentifier: 'com.crossub.landlord.staging',
      infoPlist: {
        ...expo.ios.infoPlist,
        CFBundleDisplayName: 'CROS Owner Staging',
        CFBundleName: 'CROS Owner Staging',
      },
    },
    android: {
      ...expo.android,
      package: 'com.crossub.landlord.staging',
      label: 'CROS Owner Staging',
    },
  };
};
