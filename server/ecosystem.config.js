module.exports = {
  apps: [
    {
      name: "pmapped",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
