module.exports = {
  apps: [
    {
      name: 'jaksim',
      script: './dist/main.js',
      watch: true,
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
