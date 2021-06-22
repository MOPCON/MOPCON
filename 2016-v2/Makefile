.PHONY: main install update composerInstall composerDumpAutoload composerUpdate

main: install

install:
	-composer install

update:
	git pull origin develop
	-composer install

# composer
#
composerInstall:
	-composer install

composerDumpAutoload:
	-composer dump-autoload

composerUpdate:
	-composer update

#test:
#	vendor/bin/phpunit

