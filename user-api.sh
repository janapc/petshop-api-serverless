## create a new user
curl -i --location 'http://localhost:4000/api/user' \
--header 'Content-Type: application/json' \
--data '{
	"email": "admin@admin.com",
	"password":"admin123!"
}'

## get your token to access pet-api
curl -i --location 'http://localhost:4000/api/user/login' \
--header 'Content-Type: application/json' \
--data '{
	"email": "admin@admin.com",
	"password":"admin123!"
}'