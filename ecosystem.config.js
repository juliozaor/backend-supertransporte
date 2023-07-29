module.exports = {
    deploy : {
      production : {
        user : 'root',
        host : 'supertransporte_backend_prod',
        ref  : 'origin/main',
        repo : 'https://github.com/jesidpolo04/backend-supertransporte',
        path : '/var/pesvsisi/backend_core',
        'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci --production && pm2 restart backend_core',
      }
    }
  };
  