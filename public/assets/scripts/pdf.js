function generatePdf(){
	const element = document.getElementById("db-container");

	htm2pdf(element)
	.from()
	.save();
	
}
generatePdf();

/*--function readHTML() {
	// get the HTML source file path
	var path = document.getElementById("fileUpload").files[0];
	var contents;
	$("#error-message").html("");
	$("#fileUpload").css("border", "#a6a6a6 1px solid");
	if ($(path).length != 0) {
		var r = new FileReader();
		r.onload = function(e) {
			// read HTML file content
			contents = e.target.result;
			// show JavaScript PDF preview
			$(".preview").show();
			$("#temp-target").html(contents);
			
			$(".btn-preview").hide();
			$(".btn-generate").show();
		}
		r.readAsText(path);
	} else {
		$("#error-message").html("required.").show();
		$("#fileUpload").css("border", "#d96557 1px solid");
	}
}

function converHTMLFileToPDF() {
	const { jsPDF } = window.jspdf;
	var doc = new jsPDF('l', 'mm', [1200, 1210]);

	var pdfjs = document.querySelector('#temp-target');

	// Convert HTML to PDF in JavaScript
	doc.html(pdfjs, {
		callback: function(doc) {
			doc.save("output.pdf");
		},
		x: 10,
		y: 10
	});
}--*/
   