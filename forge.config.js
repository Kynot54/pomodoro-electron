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
            name: '@electron-forge/maker-snap',
            config: {
                features: {
                    audio: true,

                }
            }
        },
        {
            name: '@electron-forge/maker-squirrel',
            config: { 
                authors: 'Kyle Whynott',
                description: 'A Pomodoro Timer Productivity App'
            }
        },
        {   
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    maintainer: "Kyle Whynott",
                    homepage: "https://www.kwhynott.dev",
                    priority: 'optional',
                    categories: ['Office', 'Utility'],
                    icon: ''
                }
            },
            platforms: ['linux']
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                options: {
                    name: 'Pomodoro Electron App',
                    productName: 'Pomodoro Timer',
                    genericName: 'Productivity Timer',
                    description: 'A GUI application to Keep Track of Time and Maintain Productivity.',
                    version: "1.0",
                    categories: ['Office', 'Utility'],
                    icon: '',
                    homepage: 'https://www.kwhynott.dev'
                }
            },
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                debug: true,
                name: 'Pomodoro Timer',
                icon: '',
                iconSize: 96,
                overwrite: true
            }
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

