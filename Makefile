####################################
# Common
####################################

up:
	docker-compose up -d

down:
	docker-compose down

start:
	make up

stop:
	make down

status:
	docker-compose ps

shell:
	make up
	docker-compose exec app bash

app_npm_install:
	docker-compose exec --workdir /app/router_test_app app npm install	

app_shell:
	make up
	make app_npm_install
	docker-compose exec --workdir /app/router_test_app app bash

app_start:
	make up
	make app_npm_install
	docker-compose exec --workdir /app/router_test_app app npm run dev

setup:
	git clone https://github.com/the-teacher/the_router.git
