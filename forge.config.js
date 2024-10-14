const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses');


module.exports = {
  packagerConfig: {
    asar: true,
    osxSign: {}
  },
  rebuildConfig: {},
  makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: { 
                authors: 'Kyle Whynott',
            }
        },
        {
            name: '@electron-forge/maker-zip' 
        },
        {   
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    maintainer: "Kyle Whynott",
                    homepage: "https://www.kwhynott.dev"
                }
            },
            platforms: ['linux']
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                options: {
                    homepage: 'https://www.kwhynott.dev'
                }
            },
            platforms: ['linux']
        }
  ],
  publishers: [
    {
        name: '@electron-forge/publisher-github',
        config: {
            repository: {
                owner: 'Kynot54',
                name: 'Pomodoro Timer Application'
            },
            prerelease: true
        }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

