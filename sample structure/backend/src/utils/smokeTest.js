import http from 'http';

function check() {
  const req = http.request({ hostname: 'localhost', port: process.env.PORT || 5002, path: '/api/health', method: 'GET' }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Health response:', data);
    });
  });
  req.on('error', (e) => console.error('Smoke test error', e));
  req.end();
}

check();
