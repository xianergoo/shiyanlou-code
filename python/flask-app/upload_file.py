import os
from flask import Flask, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/home/project'   # 上传路径
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            return '{} upload sucess'.format(filename)
        else:
            return '{0} upload error: {1}'.format(file.filename, allowed_file_res(file.filename))
    
    return '''
    <!doctype html>
    <title>上传文件</title>
    <h1>上传文件</h1>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=上传></p>
    </form>
    '''


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


def allowed_file_res(filename):
    if '.' in filename and \
        filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS:
        pass
    else:
        return 'file {0}\'s extension {1} invalid ' \
            .format(filename, filename.rsplit('.', 1)[1])

