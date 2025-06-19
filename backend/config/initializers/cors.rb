Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do

    # origins specifies which domains are allowed to make cross-origin requests (your React dev server URL).

    # resource '*' means all routes accept these requests.

    # methods are HTTP verbs allowed.

    # credentials: true allows cookies or auth headers to be sent with requests (important for token-based auth).
    
    origins 'http://localhost:3000'   # React dev server

    resource '*',
      headers: :any,
      expose: ['Authorization'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end