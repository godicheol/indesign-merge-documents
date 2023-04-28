#target indesign;

if (app.documents.length < 1) {
    alert("No documents are open. Please open a document and try again.");
} else {
    var newDoc = createDoc();

    addSpreads(newDoc);

    newDoc.pages[0].remove(); // blank
    newDoc.sections.everyItem().continueNumbering = true; // reset pages number

    function addSpreads(targetDoc) {
        for (var i = 0; i < app.documents.length; i++) {
            var doc = app.documents[i];
            if (targetDoc === doc) {
                continue;
            }
            for (var j = 0; j < doc.spreads.length; j++) {
                var spread = doc.spreads[j];
                spread.duplicate(LocationOptions.AT_END, targetDoc);
            }
        }
    }

    // function addPages(targetDoc) {
    //     var ok;
    //     var i = 0;
    //     while(true) {
    //         ok = false;
    //         for (var j = app.documents.length - 1; j >= 0; j--) {
    //             var doc = app.documents[j];
    //             if (targetDoc === doc) {
    //                 continue;
    //             }
    //             if (i < doc.pages.length) {
    //                 ok = true;
    //                 var page = doc.pages[i];
    //                 var newPage = targetDoc.pages.add();
    //                 // page.duplicate(LocationOptions.AT_END, lastPage);
    //             }
    //         }
    //         if (!ok) {
    //             break;
    //         }
    //         i += 2;
    //     }
    // }

    function copyPage(page, pageRef) {
        page.duplicate(LocationOptions.AT_END, pageRef);
    }

    function isSameDoc(a, b) {
        return a === b;
    }

    function getCurrentDirPath() {
        return app.activeDocument.parent;
    }

    function getCurrentDocPath() {
        return app.activeDocument.parent + "/" + app.activeDocument.name;
    }

    function getCurrentDocName() {
        return app.activeDocument.name.replace(/\.indd$/i, "");
    }

    function getCurrentDoc() {
        return app.activeDocument;
    }

    function generatePath() {
        return app.activeDocument.parent + "\/" + "merged_" + Date.now() + ".indd";
    }

    function createDoc() {
        return app.documents.add();
    }

    function saveDoc(doc) {
        var destPath = generatePath();
        doc.save(new File(destPath));
    }
}