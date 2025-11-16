# backend/config.ru

# This loads your Sinatra application (app.rb)
require_relative 'app' 

# This runs the Sinatra application using the Rack handler
run Sinatra::Application