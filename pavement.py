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

def append_file(path, fd):
    ''' append to file descriptor fd '''
    with open(path, 'r') as src_fd:
        copyfileobj(src_fd, fd)

def append_js_file(path, fd):
    ''' append to file descriptor fd, stripping out jslint comments  '''
    jslint_pattern = re.compile(r"/\*global.*\*/|/\*jslint browser.*\*/")
    with open(path, 'r') as src_fd:
        for line in src_fd:
            fd.write(re.sub(jslint_pattern, '', line))

def jslint(path):
    ''' Run jslint and then strip out the Ember.js stuff we don't care about
    '''
    # These jslint errors we want to ignore:
    # 1)
    #     Unexpected '.'.
    #     }.property('var'),
    # 2)
    #     Unexpected '.'.
    #     }.observes('var'),
    ignore = re.compile(r"Unexpected '\.'|\.property|\.observes")
    # --stupid means we want to ignore function names matching the *Sync* pattern
    # --sloppy means we don't care about the 'use strict' pragma
    # --white means we tolerate messy white space
    # --unparam means we tolerate unused function parameters
    # --todo means we tolerate TODO comments
    jslint_args = shlex.split('jslint --stupid --sloppy --white --unparam --todo --maxerr=1000 ' + path)
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

    # Build app.js
    for dirpath in (OUTPUT_JS_DIR, OUTPUT_CSS_DIR):
        makedirs(dirpath)
    # Run jslint on app.js, router.js, and quarry-data.js
    for file in [SRC_DIR + 'app.js', SRC_DIR + 'router.js', SRC_DIR + 'quarry-data.js']:
        if not jslint(file):
            raise Exception(file + ' failed to pass jslint!')
    with open(OUTPUT_JS_DIR + 'app.js', 'w') as appjs:
        append_file(SRC_DIR + 'app.js', appjs)
        append_js_file(SRC_DIR + 'router.js', appjs)
        copy(SRC_DIR + 'quarry-data.js', OUTPUT_JS_DIR)
        for jsdir in JS_DIRS:
            for file in iglob(SRC_DIR + jsdir + '*.js'):
                # Run jslint on every .js file before appending to app.js
                if not jslint(file):
                    raise Exception(file + ' failed to pass jslint!')
                # Special foo for 'version_view.js'
                if file.split('/')[-1] == 'version_view.js':
                    # Inject build information into 'version_view.js'
                    # if env has it (e.g., built by jenkins)
                    if ('BUILD_NUMBER' in environ and 'BUILD_ID' in environ
                        and 'GIT_BRANCH' in environ):
                        TEMP_FILE = 'version_view_temp.js'
                        with open(TEMP_FILE, 'w') as temp:
                            with open(VERSION_VIEW, 'r') as orig:
                                view = orig.read()
                                version_view_stamped = view.replace(
                                    "Version DEFAULT",
                                    "Jenkins build number: "
                                    + environ['BUILD_NUMBER']
                                    + ", Jenkins build ID: "
                                    + environ['BUILD_ID']
                                    + ", Git branch: "
                                    + environ['GIT_BRANCH'])
                            temp.write(version_view_stamped)
                        append_js_file(TEMP_FILE, appjs)
                        remove(TEMP_FILE)
                    # If no build info (e.g., manual build), do nothing special
                    else:
                        append_js_file(file, appjs)
                # All other .js files get concatenated to 'app.js' as-is
                else:
                    append_js_file(file, appjs)
    if not jslint(OUTPUT_JS_DIR + 'app.js'):
        raise Exception("app.js didn't pass jslint!")
    # Process handlebars template files
    with open(OUTPUT_JS_DIR + 'templates.js', 'w') as templatejs:
        for hbs_filepath in iglob(TEMPLATES_DIR + '*.hbs'):
            with open(hbs_filepath, 'r') as hbs_code:
                templatejs.write('Em.TEMPLATES["%s"] = Em.Handlebars.compile("%s");'
                % (splitext(basename(hbs_filepath))[0].replace('_', '/'),
                   re.escape(hbs_code.read())))
    # Concatenate all model .js files into one
    with open(OUTPUT_JS_DIR + 'models.js', 'w') as models:
        for filename in iglob(SRC_DIR + 'models/*.js'):
            append_js_file(filename, models)

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
@might_call('test')
def archive():
    call_task('test', options={
        'cleanup' : True
    })
    # Create archive
    filename = 'quarry-webui.tar.gz'
    chdir(BUILD_DIR)
    tarball = TarFile.open(filename, 'w:gz')
    tarball.add('quarry')
    tarball.close()
    rmtree('quarry/')


