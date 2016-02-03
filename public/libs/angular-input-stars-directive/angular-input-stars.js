angular.module('angular-input-stars', [])

    .directive('inputStars', function () {

        var directive = {

            restrict: 'EA',
            replace: true,
            template: '<ul ng-class="listClass">' +
            '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' +
            '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' +
            '</li>' +
            '</ul>',
            require: 'ngModel',
            scope: true,

            link: link

        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {

            scope.items = new Array(+attrs.max);

            var emptyIcon = attrs.iconEmpty || 'fa-star-o';
            var iconHover = attrs.iconHover || 'angular-input-stars-hover';
            var fullIcon = attrs.iconFull || 'fa-star';
            var halfIcon = attrs.iconHalf || 'fa-star-half'
            var iconBase = attrs.iconBase || 'fa fa-fw';
            scope.listClass = attrs.listClass || 'angular-input-stars';
            scope.readonly  = ! (attrs.readonly === undefined);
            scope.prop1 = attrs.value;

            ngModelCtrl.$render = function () {

                console.log("render");

                scope.last_value = ngModelCtrl.$viewValue || 0;

            };

            scope.getClass = function (index) {

                index = index + 1;

                //return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';
                var result = ""
                if (scope.last_value >= index-0.2) {
                    result = iconBase + ' ' + fullIcon + ' active ';
                } else if (scope.last_value >= index -0.6) {
                    result = iconBase + ' ' + halfIcon + ' active ';
                } else if (scope.last_value < index) {
                    result = iconBase + ' ' + emptyIcon + ' active ';
                }

                return result;
            };

            scope.unpaintStars = function ($index, hover) {
                console.log("unpaint stars");

                scope.paintStars(scope.last_value - 1, hover);

            };

            scope.paintStars = function ($index, hover) {

                console.log("painting stars: " + $index);

                //ignore painting, if readonly
                if (scope.readonly) {
                    return;
                }
                var items = element.find('li').find('i');

                for (var index = 0; index < items.length; index++) {

                    var $star = angular.element(items[index]);
                    console.log("$index or rating value : " + $index);
                    if ($index >= index) {
                        console.log(index + " full icon");
                        $star.removeClass(emptyIcon);
                        $star.addClass(fullIcon);
                        $star.addClass('active');


                    } else if ($index >= index-0.5) {
                        console.log(index + " half icon");
                        $star.removeClass(emptyIcon);
                        $star.removeClass(fullIcon);
                        $star.addClass(halfIcon);
                        $star.addClass('active');


                    } else {
                        console.log(index + " empty icon");
                        $star.removeClass(fullIcon);
                        $star.removeClass(halfIcon);
                        $star.removeClass('active');
                        $star.addClass(emptyIcon);

                    }
                }

                !hover && items.removeClass(iconHover);

            };

            scope.setValue = function (index, e) {

                console.log("setValue");

                //ignore painting
                if (scope.readonly) {
                    return;
                }
                var star = e.target;

                if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
                    scope.last_value = index + 1;
                } else {
                    scope.last_value = index + 1;
                }

                ngModelCtrl.$setViewValue(scope.last_value);
            };

        }

    });
