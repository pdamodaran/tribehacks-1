<!DOCTYPE html>
<html ng-app="raw">
    <head>
        <meta charset="utf8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <base href="/">
        <title>RAW</title>
        <!-- CSS-->
        <!-- Google Fonts-->
        <link href="http://fonts.googleapis.com/css?family=Lato:100,400,700" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="components/bootstrap/docs/assets/css/bootstrap.css">
        <link rel="stylesheet" href="components/bootstrap/docs/assets/css/bootstrap-responsive.css">
        <link rel="stylesheet" href="components/codemirror/lib/codemirror.css">
        <link rel="stylesheet" href="components/angular-ui/build/angular-ui.min.css">
        <link rel="stylesheet" href="components/select2/select2.css">
        <link rel="stylesheet" href="/css/app.css">
        <link rel="stylesheet" href="components/angular-bootstrap-colorpicker/css/colorpicker.css">

        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

        <!-- Google Analytics-->
        <script src="js/analytics.js"></script>
    </head>

    <body data-spy="scroll" data-target="#header">
        <div id="header" class="navbar navbar-fixed-top">
        <div class="navbar-inner">
        <div class="container"><a href="/" class="brand">RAW</a>
          <ul class="nav">
            <li class="active"><a href="#data">Data</a></li>
            <li><a href="#layout">Layout</a></li>
            <li><a href="#mapping">Mapping</a></li>
            <li><a href="#options">Visualization</a></li>
            <li><a href="#export">Export</a></li>
          </ul>
          <ul class="nav pull-right">
            <li><a href="http://raw.densitydesign.org">Need help ?</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div ng-view="ng-view" class="wrap"></div>

    <!-- Footer -->
    <div id="footer">
      <div class="container">
        <div class="row-fluid">
          <div class="span4">
            <p>A project by <a href="http://www.densitydesign.org">DensityDesign</a></p>
            <p>&copy; 2013</p>
          </div>
          <div class="span4">
            <p><a href="mailto:raw@densitydesign.org">raw@densitydesign.org</a></p>
            <p><a href="http://twitter.com/densitydesign">@densitydesign</a></p>
          </div>
          <div class="span4">
            <p><a href="http://github.com/densitydesign/raw">GitHub</a></p>
            <p><a href="https://groups.google.com/forum/?hl=en#!forum/densitydesign-raw">Google group</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Libraries-->
    <script src="components/jquery/jquery.min.js"></script>
    <script src="components/jquery-ui/ui/minified/jquery-ui.custom.min.js"></script>
    <script src="components/bootstrap/docs/assets/js/bootstrap.min.js"> </script>
    <script src="components/select2/select2.js"> </script>
    <script src="components/bootstrap-colorpicker/js/bootstrap-colorpicker.js"> </script>
    <script src="components/d3/d3.min.js"></script>
    <script src="components/d3-plugins/sankey/sankey.js"></script>
    <script src="components/d3-plugins/hexbin/hexbin.js"></script>
    <script src="components/codemirror/lib/codemirror.js"> </script>
    <script src="components/codemirror/addon/display/placeholder.js"> </script>
    <script src="components/codemirror/addon/selection/active-line.js"></script>
    <script src="components/canvg-1.3.zip/canvg.js"></script>
    <script src="components/canvg-1.3.zip/rgbcolor.js"></script>
    <script src="components/canvas-toBlob.js/canvas-toBlob.js"></script>
    <script src="components/FileSaver/FileSaver.js"></script>
    <!-- Raw-->
    <script src="js/lib/raw/raw.js"> </script>
    <script src="js/lib/raw/raw.models.js"> </script>
    <script src="js/lib/raw/raw.charts.js"> </script>
    <!-- Angular-->
    <script src="components/angular/angular.min.js"> </script>
    <script src="components/angular-ui/build/angular-ui.min.js"> </script>
    <script src="components/angular-ui/build/angular-ui-ieshiv.min.js"></script>
    <script src="components/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js"> </script>
    <script src="js/app.js"></script>
    <script src="js/services.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/filters.js"></script>
    <script src="js/directives.js"></script>
    </body>
</html>