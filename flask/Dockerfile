FROM python:3.8-buster

WORKDIR /flask
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5000
COPY . .
CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:5000", "wsgi:server"]