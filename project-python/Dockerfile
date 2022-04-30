FROM python:3.10-slim-bullseye

WORKDIR /opt/myapp

COPY ./requirements/backend.txt ./requirements/

RUN pip install -r requirements/backend.txt

COPY . .

CMD ["uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8080"]