'''
    paver config: Quarry webui
'''

import urllib
from paver.easy import task, path, needs, options, cmdopts, might_call, call_task
from glob import iglob
from shutil import rmtree, copyfileobj, copy, move, copytree
from tarfile import TarFile
from os.path import basename, splitext
import re
from os import remove, chdir, makedirs, environ
import subprocess, shlex
import json
from itertools import chain

SRC_DIR = 'app/'
VERSION_VIEW = SRC_DIR + 'views/version_view.js'
TEST_DIR = 'test/'
BUILD_DIR = 'build/'
TEMPLATES_DIR = SRC_DIR + 'templates/'
OUTPUT_DIR = BUILD_DIR + 'quarry/'
OUTPUT_JS_DIR = OUTPUT_DIR + 'js/'
OUTPUT_CSS_DIR = OUTPUT_DIR + 'css/'
OUTPUT_IMAGES_DIR = OUTPUT_DIR + 'images/'
OUTPUT_FONT_DIR = OUTPUT_DIR + 'font/'
OUTPUT_TEST_DIR = OUTPUT_DIR + 'test/'
TEST_OUTPUT = OUTPUT_DIR + 'test_output.log'
JS_DIRS = ('mixins/', 'helpers/', 'utilities/', 'classes/', 'routes/',
           'views/', 'controllers/', 'models/schema/')
JSDOC_SRC = 'jsdoc/'
JSDOC_CONFIG = JSDOC_SRC + 'conf.json'
JSDOC_DIR = OUTPUT_DIR + 'jsdoc/'
JSLINT_GLOBALS = '/*global window, document, console, Em, App, Handlebars, '\
                 'Mantel, QuarryTest, $ */'

def append_file(src_path, dest_fd):
    '''
    append to file descriptor fd

    @param src_path: source file pathname string
    @param dest_fd: open file descriptor with write permissions
    '''
    with open(src_path, 'r') as src_fd:
        for line in src_fd:
            dest_fd.write(line)

def src_js_files():
    ''' returns an iterable containing all source js files, in a sane order '''
    app_init_files = (SRC_DIR + 'app.js', SRC_DIR + 'router.js')
    js_files = (file for dir in JS_DIRS for file in iglob(SRC_DIR + dir + '*.js'))
    return chain(app_init_files, js_files)

def jslint(path, strict=False):
    '''
    Run jslint and then strip out the Ember.js stuff we don't care about

    These jslint errors we want to ignore:
    1)
         Unexpected '.'.
         }.property('var'),
    2)
         Unexpected '.'.
         }.observes('var'),

    @param path: source file pathname string
    @keyword strict: enforce ES5 strict mode?
    '''
    ignore = re.compile(r"Unexpected '\.'|\.property|\.observes")
    # --stupid means we want to ignore function names matching the *Sync* pattern
    # --sloppy means we don't care about the 'use strict' pragma
    # --white means we tolerate messy white space
    # --unparam means we tolerate unused function parameters
    # --todo means we tolerate TODO comments
    if strict:
        jslint_args = shlex.split('jslint --stupid --white --unparam '
                                  '--todo --maxerr=1000 ' + path)
    else:
        jslint_args = shlex.split('jslint --stupid --white --sloppy --unparam '
                                  '--todo --maxerr=1000 ' + path)
    jslint = subprocess.Popen(jslint_args, stdout=subprocess.PIPE)
    out, err = jslint.communicate()
    # we're going to capture all lines that don't match our regex 'ignore' pattern
    errors = [line for line in out.splitlines()[2:]
               if not re.search(ignore, line)]
    if errors:
        print '\njslint errors in ' + path + ':\n'
        for line in errors:
            print line
        return False
    return True

def version_view_fooify(fd):
    '''
    Inject build information into App.VersionView

    @param fd: open 'r+' file descriptor
    '''
    orig = fd.read()
    version_view_stamped = orig.replace(
        "Version DEFAULT",
        "Jenkins build number: "
        + environ['BUILD_NUMBER']
        + ", Jenkins build ID: "
        + environ['BUILD_ID']
        + ", Git branch: "
        + environ['GIT_BRANCH'])
    fd.seek(0)
    fd.write(version_view_stamped)

def es5_strictify(src_files, dest_fd, namespace, globals=None):
    '''
    Enclose a JavaScript file/module inside a namespaced function closure

    @param src_files: enumerable that contains file pathname strings
    @param dest_fd: open file descriptor with write permissions
    @param namespace: namespace string, e.g., 'Quarry'
    @keyword globals: jslint /*global*/ directive, e.g., '/*global App*/'
    '''
    if globals:
        dest_fd.write(globals + '\n')
    # we're going to wrap the namespace inside a function closure
    dest_fd.write('var ' + namespace + ' = (function () {\n')
    # and enforce ES5 strict across it
    dest_fd.write('"use strict";')
    for file in src_files:
        append_file(file, dest_fd)
    # we return the local App var inside our function closure
    dest_fd.write('\nreturn ' + namespace + ';\n')
    dest_fd.write('}());')

def minify(src, dest):
    '''
    Minify function, featuring uglifyjs

    @param src: source file pathname string (the original .js file)
    @param dest: destination file pathname string (the minified file)
    '''
    uglifyjs_args = shlex.split('uglifyjs ' + src + ' -o ' + dest)
    uglifyjs = subprocess.Popen(uglifyjs_args, stdout=subprocess.PIPE)
    if uglifyjs.wait() != 0:
        print 'Failed to minify!'

@task
def clean():
    ''' Cleanup any prior builds '''
    if path(OUTPUT_DIR).exists():
        rmtree(OUTPUT_DIR)
    for filename in iglob(BUILD_DIR + 'quarry-webui*.tar.gz'):
        remove(filename)

@task
@needs(['clean'])
def build(options):
    ''' Build '''

    # make output directories
    for dirpath in (OUTPUT_JS_DIR, OUTPUT_CSS_DIR):
        makedirs(dirpath)

    # run jslint on original source files
    for file in src_js_files():
        if not jslint(file):
            raise Exception(file + ' failed to pass jslint!')

    # Special foo for App.VersionView if we're building from Jenkins
    if ('BUILD_NUMBER' in environ and 'BUILD_ID' in environ
        and 'GIT_BRANCH' in environ):
        with open(VERSION_VIEW, 'r+') as version_view:
            version_view_fooify(version_view)

    # build ES5 strict app.js
    with open(OUTPUT_JS_DIR + 'app.js', 'w') as appjs:
        es5_strictify(src_js_files(), appjs, 'App', JSLINT_GLOBALS)

    # build ES5 strict quarry-data.js
    with open(OUTPUT_JS_DIR + 'quarry-data.js', 'w') as quarrydatajs:
        files = (SRC_DIR + 'quarry-data.js',)
        es5_strictify(files, quarrydatajs, 'Quarry', JSLINT_GLOBALS)
    if not jslint(BUILD_DIR + 'app.js', True):
        raise Exception("app.js didn't pass jslint!")

    # Process handlebars template files
    with open(OUTPUT_JS_DIR + 'templates.js', 'w') as templatejs:
        for hbs_filepath in iglob(TEMPLATES_DIR + '*.hbs'):
            with open(hbs_filepath, 'r') as hbs_code:
                templatejs.write('Em.TEMPLATES["%s"] = '
                                 'Em.Handlebars.compile("%s");'
                % (splitext(basename(hbs_filepath))[0].replace('_', '/'),
                   re.escape(hbs_code.read())))

    # Concatenate all model .js files into one
    with open(OUTPUT_JS_DIR + 'models.js', 'w') as models:
        for filename in iglob(SRC_DIR + 'models/*.js'):
            append_file(filename, models)

    # Copy html files to build dir
    for htmlpath in iglob(SRC_DIR + 'html/*.html'):
        copy(htmlpath, OUTPUT_DIR)

    # Copy 3rd party libraries
    for libpath in iglob(SRC_DIR + 'js/*.js'):
        copy(libpath, OUTPUT_JS_DIR)
    for libpath in iglob(SRC_DIR + 'js/*.map'):
        copy(libpath, OUTPUT_JS_DIR)

    # Copy css
    for csspath in iglob(SRC_DIR + 'css/*.css'):
        copy(csspath, OUTPUT_CSS_DIR)

    # Copy images
    copytree(SRC_DIR + 'images/', OUTPUT_IMAGES_DIR)
    # Move favicon.ico to webroot

    # Copy fonts
    copytree(SRC_DIR + 'font/', OUTPUT_FONT_DIR)

    # Invoke jsdoc
    jsdoc = subprocess.call([JSDOC_SRC + 'jsdoc', '-c', JSDOC_CONFIG,
                               '-d', JSDOC_DIR])
    if jsdoc != 0:
        raise subprocess.CalledProcessError(jsdoc, [JSDOC_SRC + 'jsdoc',
                                                        '-c', JSDOC_CONFIG,
                                                        '-d', JSDOC_DIR])
    # Minify
    for file in [OUTPUT_JS_DIR + filename for filename in ['app.js',
            'quarry-data.js', 'models.js', 'mantel.js']]:
        orig = file.split('.')
        minify(file, orig[0] + '.min.' + orig[1])
        # Clean up original, non-minified file
        remove(file)

@task
@needs('build')
@cmdopts([
    ('cleanup', 'c', 'Delete test files following successful run')
])
def test():
    # Setup test directories
    copytree(TEST_DIR, OUTPUT_TEST_DIR)
    copytree(TEMPLATES_DIR, OUTPUT_TEST_DIR + 'templates/')
    # Run unit tests
    with open(TEST_OUTPUT, 'w+') as karma_output:
        karma = subprocess.call(['karma', 'start', '--no-colors'],
            stdout=karma_output)
        if karma != 0:
            karma_output.seek(0)
            print karma_output.read()
            raise subprocess.CalledProcessError(karma, ['karma', 'start', '--no-colors'])
    # Clean up test files
    try:
        if options.test.cleanup:
            rmtree(OUTPUT_TEST_DIR)
    except AttributeError:
        pass
    except Exception:
        print 'Failed to clean up test directory!'

@task
@needs('build')
#@might_call('test')
def archive():
    #call_task('test', options={
    #    'cleanup' : True
    #})
    # Create archive
    filename = 'quarry-webui.tar.gz'
    chdir(BUILD_DIR)
    tarball = TarFile.open(filename, 'w:gz')
    tarball.add('quarry')
    tarball.close()
    rmtree('quarry/')


