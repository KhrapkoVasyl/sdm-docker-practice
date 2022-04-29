FROM python:3.10-buster

WORKDIR /opt/myapp

COPY . .

RUN pip install -r requirements/backend.txt

CMD ["uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8080"]