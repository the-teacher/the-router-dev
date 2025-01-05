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

app_shell:
	make up
	docker-compose exec --workdir /app/router_test_app app bash

setup:
	git clone https://github.com/the-teacher/the-router.git
