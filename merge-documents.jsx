#target indesign;

var docs = app.documents;

if (!docs.length < 1) {
    alert("No documents are open. Please open a document and try again.", true);
    return false;
}

var newDoc = createDoc();

var newPages = getPages();

for(var i = 0; i < newPages.length; i++) {
    var page = newPages[i];
    newDoc.pages.add(LocationOptions.AFTER, page);
}

saveDoc(newDoc);

function getPages() {
    var result = [];
    var ok;
    var i = 0;
    while(true) {
        ok = false;
        for (var j = 0; j < docs.length; j++) {
            var doc = docs[j];
            var page = doc.pages[i];
            if (typeof(page) !== "undefined") {
                ok = true;
                result.push(page);
            }
        }
        if (!ok) {
            break;
        }
        i++;
    }
    return result;
}

function copyLayer(sourceLayer, destLayer) {
    sourceLayer.pageItems.everyItem().duplicate(destLayer);
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

function getMaxLayerLength() {
    var n = 0;
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        var layers = doc.layers;
        if (n < layers.length) {
            n = layers.length;
        }
    }
    return n;
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

// end
return true;