## register a new pet
curl -i --location 'http://localhost:5000/api/pet' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer youTokenHere' \
--data '{
	"breed": "husky",
	"name": "gamora",
	"birthDay": "11/10/2010",
	"identifyNumberCustomer": "912839450"
}'

## list all pets
curl -i --location 'http://localhost:5000/api/pet' \
--header 'Authorization: Bearer yourTokenHere'

## search pets
curl -i --location 'http://localhost:5000/api/pet/search?query=Brutus' \
--header 'Authorization: Bearer yourTokenHere'

## upload pets by CSV
curl -i --location 'http://localhost:5000/api/pet/batch' \
--header 'Authorization: Bearer yourTokenHere' \
--form 'file=@"/root/register_pet.csv"'
