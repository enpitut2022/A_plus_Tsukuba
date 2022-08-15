#!/usr/bin/env bash

python manage.py makemigrations
python manage.py migrate
python init/kdb2db.py
