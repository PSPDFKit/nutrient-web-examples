<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
 		<!-- Element where PSPDFKit will be mounted. -->
		<div id="pspdfkit" style="height: 100vh"></div>

		<script src="assets/pspdfkit/pspdfkit.js"></script>

		<script>
			PSPDFKit.load({
				container: "#pspdfkit",
				document: "document.pdf", // Add the path to your document here.
			})
			.then(function(instance) {
				console.log("PSPDFKit loaded", instance);
			})
			.catch(function(error) {
				console.error(error.message);
			});
		</script>
	</body>
</html>
