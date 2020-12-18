# Use the Python 3.8 base image.
FROM python:3.8-buster

# Install zip, so that we can archive our model after training for download.
RUN apt-get update && apt-get install zip

WORKDIR /jupyter

# Install packages such as Tensorflow and Jupyter, as outlined in requirements.txt
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Allow Jupyter notebooks that use a WebSocket to proxy HTTP traffic.
RUN jupyter serverextension enable --py jupyter_http_over_ws

# Expose Jupyter notebook server at port 8888, and Tensorboard at port 6006.
EXPOSE 8888 6006

# Copy our notebook to the container
COPY mnist_train.ipynb mnist_train.ipynb

# Start up a Jupyter server. To keep things simple, do not require a password.
CMD ["jupyter", "notebook", "--no-browser", "--ip", "0.0.0.0", "--allow-root", "--NotebookApp.token=''", "--NotebookApp.password=''"]