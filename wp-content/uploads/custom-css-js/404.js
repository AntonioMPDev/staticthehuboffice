<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
const pages = [
	"page-id-378",
	"page-id-468",
	"page-id-581",
	"single"
]

pages.forEach(page => {
	if (document.body.classList.contains(page)) {
		const logoImageParent = document.querySelector(".custom-logo-link")
		const logoHtml = logoImageParent.innerHTML

		// Replace everywhere fondo-negro for fondo-negro-1 in the html
		const replaced = logoHtml.replace(/fondo-negro/g, "fondo-negro-1")
		logoImageParent.innerHTML = replaced

	}
})</script>
<!-- end Simple Custom CSS and JS -->
