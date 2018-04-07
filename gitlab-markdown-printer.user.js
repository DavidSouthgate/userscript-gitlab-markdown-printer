// ==UserScript==
// @name         Gitlab Markdown Printer
// @namespace    https://gitlab.com/southgate/userscripts/gitlab-markdown-printer/raw/master/gitlab-markdown-printer.user.js
// @updateURL    https://gitlab.com/southgate/userscripts/gitlab-markdown-printer/raw/master/gitlab-markdown-printer.user.js
// @downloadURL  https://gitlab.com/southgate/userscripts/gitlab-markdown-printer/raw/master/gitlab-markdown-printer.user.js
// @version      1.0.0
// @description  Adds button to easily print GitLab markdown
// @author       David Southgate
// @match        https://gitlab.com/*.md
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("div.file-actions").prepend(
        "<div class='btn-group' role='group'>" +
        "    <button id='print-md' name='button' class='btn btn-default'>Print</button>" +
        "</div>"
    );

    $("button#print-md").click(function() {

        // Add CSS
        $("head").append(
            "<style id='print-md-css'>" +
            "    header, .nav-sidebar, .info-well, .nav-block, .alert-wrapper, .js-file-title {" +
            "        display: none!important;" +
            "    }" +
            "    .file-content, .layout-page, .content-wrapper {" +
            "        padding: 0!important;" +
            "        margin: 0!important;" +
            "    }" +
            "    article {" +
            "        border: none!important;" +
            "    }" +
            "    .container-fluid {" +
            "        max-width: 100%!important;" +
            "    }" +
            "    @media print {" +
            "        a[href]:after {" +
            "            content: none !important;" +
            "        }" +
            "        .no-print, .no-print * {" +
            "            display: none!important;" +
            "        }" +
            "    }" +
            "    .btn-print-md {" +
            "        margin-right: 10px;" +
            "        margin-top: 10px;" +
            "    }" +
            "</style>"
        );

        $("#content-body .container-fluid").prepend(
            "<button id='print-md-start' class='btn btn-primary btn-print-md no-print' onclick='window.print();'>" +
            "    Print" +
            "</button>" +
            "<button id='print-md-exit' class='btn btn-default no-print btn-print-md'>" +
            "    Exit Print Mode" +
            "</button>" +
            "<button id='print-md-images' class='btn btn-default no-print btn-print-md'>" +
            "    Load Images" +
            "</button>"
        );

        $("#content-body .container-fluid").append(
            "<button id='print-md-top' class='btn btn-primary btn-print-md no-print' onclick='window.scrollTo(0, 0);'>" +
            "    Back to Top" +
            "</button>"
        );

        $("#print-md-exit").click(function() {
            $("#print-md-css").remove();
            $("#print-md-start").remove();
            $("#print-md-images").remove();
            $("#print-md-top").remove();
            $("#print-md-exit").remove();
        });

        $("#print-md-images").click(function() {
            $("html, body").animate({ scrollTop: $(document).height() }, 5000);
        });
    });
})();