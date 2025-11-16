require "sinatra"
require "sinatra/cross_origin"
require "json"
require "sequel"

configure do
  enable :cross_origin
end

before do
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type"
  response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
end

options "*" do
  200
end


DB = Sequel.connect(ENV.fetch('DATABASE_URL'))


todos = DB[:todos]

before do
  content_type :json
end

# --------------------------------
# CRUD Routes
# --------------------------------

# READ all todos
get "/todos" do
  todos.all.to_json
end

# CREATE a todo
post "/todos" do
  data = JSON.parse(request.body.read)
  id = todos.insert(title: data["title"], completed: false)
  { id: id, message: "Todo created!" }.to_json
end

# UPDATE a todo
put "/todos/:id" do
  data = JSON.parse(request.body.read)
  todos.where(id: params[:id]).update(
    title: data["title"],
    completed: data["completed"]
  )
  { message: "Todo updated!" }.to_json
end

# DELETE a todo
delete "/todos/:id" do
  todos.where(id: params[:id]).delete
  { message: "Todo deleted!" }.to_json
end
