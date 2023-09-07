class SuperEditor {

    createForm = document.forms.create
    importForm = document.forms.import
    view = false
    fileName = false;
    isDirty = false;
    unsavedMsg = 'Unsaved changes will be lost. Are you sure?';
    unsavedTitle = 'Discard changes';

    markDirty() {
        this.isDirty = true;
    };

    markClean() {
        this.isDirty = false;
    };

    checkDirty() {
        if (this.isDirty) { return unsavedMsg; }
    };

    jump(e) {
        let hash = location.hash;
        if (hash.indexOf('/') > -1) {
            let parts = hash.split('/');
            let fileNameEl = document.getElementById('file_name');
            view = parts[0].substring(1) + '-view';

            fileName = parts[1];
            fileNameEl.innerHTML = fileName;
        } else {
            if (!this.isDirty || confirm(unsavedMsg, unsavedTitle)) {
                this.markClean();
                view = 'browser-view';
                if (hash != '#list') {
                    location.hash = '#list';
                }
            } else {
                location.href = e.oldURL;
            }
        }
        document.body.className = view;
    };

}

window.onload = function () {

    let editor = new SuperEditor()

    window.addEventListener('beforeunload', editor.checkDirty.bind(editor), false);
    window.addEventListener('hashchange', editor.jump.bind(editor), false);

};


