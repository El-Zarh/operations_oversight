const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

const fs = require('fs').promises;

// create a document and pipe to a blob
const doc = new PDFDocument;
const stream = doc.pipe(blobStream());

// and some justified text wrapped into columns

doc
  .text('And here is some wrapped text...', 100, 220)
  .font('Times-Roman', 16)
  .moveDown()
  .text(lorem, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 1,
    height: 400,
    
  });
  
  doc.addPage()
  
 
  // Add a 50 point margin on all sides
doc.addPage({
  margin: 300});


// Add different margins on each side
doc.addPage({
  margins: {
    top: 30,
    bottom: 30,
    left: 50,
    right: 40
  }
});
  
// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
