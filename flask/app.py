import requests
import json
from flask import Flask, jsonify, request

import base64
from io import BytesIO
from PIL import Image, ImageOps
import numpy as np

server = Flask(__name__)

@server.route('/mnist/predict/', methods=['POST'])
def mnist_predict():
    data_url = request.get_json()
    content = data_url.split(';')[1]
    image_encoded = content.split(',')[1].encode('utf-8')

    # Transform image into something our model expects:
    # (28, 28, 1) dimensional array, grayscale values between 0 and 1.
    image_bytes = BytesIO(base64.b64decode(image_encoded))
    im = Image.open(image_bytes)
    im = ImageOps.grayscale(im)
    im = im.resize((28, 28))
    im_array = np.array(im).reshape((28, 28, 1)) / 255.

    # Make POST request to Tensorflow Serving to get prediction.
    # Wrap the prediction as response of this API.
    r = requests.post(
        'http://tfserver:8501/v1/models/mnist:predict',
        json={ 'instances': [im_array.tolist()] }
    )
    return jsonify(r.json())