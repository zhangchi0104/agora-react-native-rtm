module.exports = {
  name: 'bootstrap',
  factory() {
    return {
      hooks: {
        afterAllInstalled(project, options) {
          if (
            options &&
            (options.mode === 'update-lockfile' ||
              options.mode === 'skip-build')
          ) {
            return;
          }
        },
      },
    };
  },
};
