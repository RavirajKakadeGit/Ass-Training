module.exports = {
  db: 'mongodb://localhost/proximabiz?replicaSet=pwRepSet',
  jwtSettings: {
    secret: 'proximabiz',
    expiresIn: '1h',
    secret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTYzNjA0NDQsImV4cCI6MTU4Nzg5NjQ0NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.NauR1rVYLwvF_LL9LJAuTMz1Rv1Bkvtd21oZUli_w98',
    algorithm: 'HS256',
    issuer: 'proximabiz.com',
    audience: 'proximabiz.com',
    ignoreExpiration: false
  }
} 