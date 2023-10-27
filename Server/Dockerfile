FROM python:3.11-buster

WORKDIR /src
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
COPY manage.py .
RUN python manage.py collectstatic --noinput
CMD gunicorn --bind 0.0.0.0:8000 --workers 3 Backend.wsgi:application