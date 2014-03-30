'use strict';

/* Directives */

angular.module('raw.directives', [])
	
	/* Group */

	 .directive('group', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        scope.$watch(attrs.watch,function(){
          var last = element;

          element.children().each(function(i,o){
            if( (i) && (i) % attrs.every == 0) {
              last = element.clone().empty();
              last.insertAfter(element);
            }
            $(o).appendTo(last)
          })
        })

      }
    };
  })

	/* Select picker */

	.directive('selectpicker', function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {
        element.selectpicker();
      }
    };
  })

  .directive('color', function ($rootScope) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope : {
        colors : '=',
        model : '='
      },
      templateUrl : 'templates/color.html',
      link: function postLink(scope, element, attrs) {

        scope.colorsList = [];

        scope.setColor = function(color) {
          scope.colors.value(color.key, color.value);
          $rootScope.$broadcast("update");
        }

        scope.$watch('model', function (model){
          scope.colorsList = d3.entries(scope.colors());
        },true)
        
      }
    };
  })


	
	/* Chart */

	.directive('chart', function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

      	var updateLayout = function() {
          
          var target = d3.select(element[0]),
              model = scope.chart.model;

          target.selectAll("svg").remove();
          if (!model.isValid() || !scope.data.length) return;
                  
        	scope.chart.render(scope.data, target);
          //scope.update();
        }

        scope.$watch("chart",function(){
        	if(scope.chart) updateLayout();
        },true)

        scope.$watch("data",function(){
        	if(scope.chart) updateLayout();
        }, true)

        scope.$on("update", function(){
          if(scope.chart) updateLayout();
        })


      }
    };
  })

  /* UI */
	
	/* Draggable */
  
  .directive('draggable', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.draggable({
          
          // fixing width issue
          start:function(event,ui){
            var w = element.css("width");
            element.css("width", w);
            element.css("opacity", .4);
            ui.helper.css("width", w);
            ui.helper.css("top","800px")
            ui.helper.css("z-index", 10000);
            //
            scope.dragging.key = scope.$eval(attrs.value).key;
            scope.dragging.type = scope.$eval(attrs.value).type;
            scope.$apply();
          },

          stop:function(){
            element.css("width", "");
            element.css("opacity", "");
            //
            scope.dragging.key = "";
            scope.dragging.type = "";
            scope.$apply();
          }

        });

        element.disableSelection();

        // options, not so much safe uh?
        var options = element.draggable('option');
        for(var a in attrs){
        	if (options.hasOwnProperty(a)) {
        		element.draggable('option', a, attrs[a]);
        	}
        }
      }
    };
  })

  /* Droppable */

  .directive('droppable', function () {
    return {
      replace : false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.droppable({
          accept: scope.accept
        })
      }
    };
  })

  /* Sortable */

  .directive('sortable', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      	var sortableIn = false;
      	var dropString = "drop here";
        
        function getValues(){
          var values = element.sortable('toArray',{ attribute : "value" }).map(function(d){ return d.length ? JSON.parse(d) : {} });
          return values.filter(function(d){ return d.hasOwnProperty('key'); });
        }

      	function typeIsValid(){
      		var types = scope.$eval(attrs.ngModel).value.map(function(r){return r.type;});
      		var validTypes = scope.$eval(attrs.accept);
      		var valid = true;
      		for (var t in types) {
      			if (validTypes.indexOf(types[t]) == -1) {
      				valid = false;
      				break;
      			}
      		}
      		return valid;
      	}

      	function update(){

    			scope.$eval(attrs.ngModel).value = getValues();
    			
        	scope.$eval(attrs.ngModel).value = $.grep(scope.$eval(attrs.ngModel).value, function(v, k){
          		return $.inArray(v.key,scope.$eval(attrs.ngModel).value.map(function(r){return r.key;})) === k;
        	});
        	

        	/*if(typeIsValid()) {
        		element.addClass("success");
        		element.removeClass("fail");
        	} else {
        		element.addClass("fail");
        		element.removeClass("success");
        	}

        	if(!scope.$eval(attrs.ngModel).value.length) {
        		element.removeClass("success");
        		element.removeClass("fail");
        	}*/
    			element.find('.ui-draggable').remove();
    			scope.$apply();
      	}

        element.sortable({
       //   axis: "y",
        	update: update,
        	items: (attrs.items || '> li'),
        	placeholder: 'placeholder',
        	
        	receive: function(event, ui)
	        {
	        	sortableIn = true; 
	        },

	        over: function(event, ui)
	        {
            element.find('.placeholder.static').remove();
	          sortableIn = true;
	        },

	        out: function(event, ui)
	        {
            if(ui.item.hasClass('ui-draggable') && !scope.$eval(attrs.single) || !scope.$eval(attrs.ngModel).value.length ) {
              element.append('<div class="placeholder static">' + dropString + '</div>');
              if (dropString == 'drop here') element.find('.placeholder').addClass("valid");
              else element.find('.placeholder').addClass("invalid");
            }

            sortableIn = false;
	        },
          
          start: function (e, ui)
          {
          	//if(!scope.$eval(attrs.single))
            	ui.placeholder.html(dropString);
            //else ui.placeholder.remove()
          },
          
	        beforeStop: function(event, ui)
	        { 

            if(!ui.item.hasClass('ui-draggable')) {
              element.append('<div class="placeholder static">drop here</div>');
            }

	          if (!sortableIn || scope.$eval(attrs.single) && scope.$eval(attrs.ngModel).value && scope.$eval(attrs.ngModel).value.length) {
              sortableIn = false;
	            ui.item.remove();
	            update();                
	          }
            element.find('.placeholder').removeClass("valid");
            element.find('.placeholder').removeClass("invalid");
          }

        });

				scope.$watch(function(){return scope.$eval(attrs.ngModel).value},function(val){
					if(!val.length && !element.find(".placeholder.static").length) element.append('<div class="placeholder static">drop here</div>');
				},true)

				scope.$watch("dragging",function(val){

					if (!val || !val.type || val.type == "") {
						dropString = "drop here";
						element.find('.placeholder').html(dropString);
            element.find('.placeholder').removeClass("invalid");
            element.find('.placeholder').removeClass("valid");
						return;
					}

					var validTypes = scope.$eval(attrs.accept);
					if(validTypes.indexOf(val.type) != -1) {
						dropString = "drop here";
						element.find('.placeholder').html(dropString);
            element.find('.placeholder').removeClass("invalid");
            element.find('.placeholder').addClass("valid");
					}
					else {
						dropString = "no " + val.type + "s here!";
						element.find('.placeholder').html(dropString);
            element.find('.placeholder').addClass("invalid");
            element.find('.placeholder').removeClass("valid");
					}

				},true)

        element.disableSelection();
      }
    
    };
  })
	
	.directive('coder', function () {
    return {
      restrict: 'E',
      scope : {
        source : '@',
        moviePath : '@'
      },
      template :  '<textarea id="source-to-copy" readonly class="span12 source-area" rows="4" ng-model="val"></textarea>',
                  //'<button class="btn btn-block" id="copy" value="source-to-copy">Copy</button>',

      link: function postLink(scope, element, attrs) {

        scope.val = "";

        function asHTML(){
          if (!$(scope.source).length) return "";
          return d3.select(scope.source)
          .attr("xmlns", "http://www.w3.org/2000/svg")
          .node().parentNode.innerHTML;
        }

        scope.$watch(asHTML, function(){
          scope.val = asHTML();
        })
      }
    };
  })

   .directive('downloader', function () {
    return {
      restrict: 'E',
      replace:true,
      scope : {
        type : '@',
        source : '@',
        label : '@'
      },
      template :  '<div class="row-fluid">' +
                    '<p class="header">{{label}}</p>' +
                    '<form class="form-search">' +
                        '<input class="span12" placeholder="filename" type="text" maxlength="50">' +
                      '<button class="btn btn-block btn-success push-up" ng-click="download()">Download</button>' +
                    '</form>' +
                  '</div>',

      link: function postLink(scope, element, attrs) {

        var getBlob = function() {
            return window.Blob||window.WebKitBlob||window.MozBlob;
          }

        scope.download = function(){
          if(!scope.type || !scope.source) return;

          if (scope.type == "svg") downloadSVG();
          if (scope.type == "pdf") downloadPDF();
          if (scope.type == "png") downloadImage();
          if (scope.type == "json") downloadData();
        }

        /* Download SVG */
        var downloadSVG = function(){

          var BB = getBlob();
         
          var html = d3.select(scope.source).select("svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

          var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

          if (isSafari) {
            var img = "data:image/svg+xml;utf8," + html;
            var newWindow = window.open(img, 'download');
          } else {
            var blob = new BB([html], { type: "data:image/svg+xml" });
            saveAs(blob, (element.find('input').val() || element.find('input').attr("placeholder")) + ".svg")
          }

        }


        /* Download Image */

        var downloadImage = function(){
          var content = d3.select("body").append("canvas")
              .attr("id", "canvas")
              .style("display","none")

          var html = d3.select(scope.source).select("svg")
              .node().parentNode.innerHTML;

          canvg('canvas', html);
          var canvas = document.getElementById("canvas");//, ctx = canvas.getContext("2d");
          
          var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
          
          if (isSafari) {
            var img = canvas.toDataURL("image/png;base64");
            var newWindow = window.open(img, 'download');
          } else {
            canvas.toBlob(function(blob) {
              saveAs(blob, (element.find('input').val() || element.find('input').attr("placeholder")) + ".png");
            }, "image/png");
          }

          d3.select("#canvas").remove();
      } 

      /* Download Data */

      var downloadData = function() {
        var json = JSON.stringify(scope.$eval(scope.source));
        var blob = new Blob([json], {type: "data:text/json;charset=utf-8"});
        saveAs(blob, (element.find('input').val() || element.find('input').attr("placeholder")) + ".json")
      }

    }
  };
});
