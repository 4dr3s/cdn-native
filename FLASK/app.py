from dotenv import load_dotenv
import os
from flask import Flask, request, render_template, jsonify
import b2sdk.v2
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

def accound_credentials():
    info = b2sdk.v2.InMemoryAccountInfo()
    api = b2sdk.v2.B2Api(info)
    appKeyId = os.getenv("ACCOUNT_ID")
    appKey = os.getenv("APPLICATION_KEY")
    api.authorize_account("production", appKeyId, appKey)
    return api

@app.route("/upload", methods=["POST"])
def uploadImage():
    body = {}
    try:
        file = request.files["file"]
        filePath = file.filename
        api = accound_credentials()
        bucket = api.get_bucket_by_name(os.getenv("BUCKET_NAME"))
        bucket.upload_bytes(file.read(), filePath)
        body["message"] = f"Archivo {filePath} subido a Backblaze exitosamente"
    except:
        body["message"] = "Error al subir"
    return jsonify(body)

@app.route("/list_files")
def list_files():
    api = accound_credentials()
    bucket = api.get_bucket_by_name(os.getenv("BUCKET_NAME"))
    files = list(bucket.ls())

    file_info = []
    for file, _ in files:
        file_info.append({
            'name': file.file_name,
            'size': file.size
        })

    return jsonify(file_info)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)