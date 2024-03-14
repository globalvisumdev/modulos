const pathnameWindowIcon = (document.location.pathname).split("/")[1];
const confIcon = localStorage.getItem("fmw7-conf")

// document.querySelector("head").innerHTML += `<link rel="icon"  type="image/png" href="/${pathnameWindowIcon}/modulos/windowIcon/img/logo.png">`
// document.querySelector("head").innerHTML += `<link rel="icon"  type="image/png" href="${store.getters.getLogo.value}">`


document.querySelector("head").innerHTML += `
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/${confIcon}/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/${confIcon}/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/${confIcon}/favicon-16x16.png">
  <link rel="manifest" href="assets/favicon/${confIcon}/site.webmanifest">
  <link rel="mask-icon" href="assets/favicon/${confIcon}/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="assets/favicon/${confIcon}/favicon.ico">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-config" content="/assets/favicon/${confIcon}/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">
  <title>${confIcon}</title>
`;