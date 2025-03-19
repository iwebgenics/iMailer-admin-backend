// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: "imailer-admin-backend",
        script: "server.js",
        cwd: "/var/www/html/imailer-admin-backend",
        env: {
          NODE_ENV: "production",
          PORT: 5009,
          MONGODB_URI: "mongodb+srv://imailerapp:1yY9TBnBGocfOEFs@cluster0.qrmyk.mongodb.net/Massmailer?retryWrites=true&w=majority&appName=Cluster0",
        },
      },
    ],
  };