var cogFilesDetails = angular.module("cog-files-details", []);
function cogFilesDetailsCtrl($rootScope, $scope, $element, $state, $http, cogFilesDetails)
{
    var self = this;
    // console.log($state.params.id);
    cogFilesDetails.getDetails(self, {id: $state.params.id},function(data){
        var cogFileObj = data.content;
        var childrenAry = new Array();
        $.each(cogFileObj.design.pages.children, function(index, val){
            var obj = new Object();
            var obj2 = new Object();
            if(val.name.search(".html") < 0)
            {
                obj.text = val.name;
                obj.children = new Array();
                obj.state = {opened: true};
                $.each(val.children, function(index2, val2){
                    obj2 = new Object();
                    obj2.text = val2.name;
                    obj2.icon = 'none';
                    obj.children.push(obj2);
                });
                childrenAry.push(obj);
            }
            else
            {
                childrenAry.push({text: val.name, icon: 'none'});
            }
        });
        
        $.each(cogFileObj.design.assets, function(key, val){
            var obj = new Object();
            var obj2 = new Object();
            
            obj.text = key;
            obj.children = new Array();
            obj.state = {opened: true};
            
            $.each(val.children, function(index2, val2){
                obj2 = new Object();
                obj2.text = val2.name;
                obj2.icon = 'none';
                obj.children.push(obj2);
            });
            childrenAry.push(obj);
        });
        self.treeConfig = {
            'plugins' : [],
            'types' : {
                'default' : {
                    'icon' : 'fa fa-folder'
                },
                'html' : {
                    'icon' : 'fa fa-file-code-o'
                },
                'svg' : {
                    'icon' : 'fa fa-file-picture-o'
                },
                'css' : {
                    'icon' : 'fa fa-file-code-o'
                },
                'img' : {
                    'icon' : 'fa fa-file-image-o'
                },
                'js' : {
                    'icon' : 'fa fa-file-text-o'
                }
    
            }
        };
        self.content = [
                {
                    'text': 'root',
                    'state': {
                        'opened': true
                    },
                    'children': childrenAry
                }
            ];
    });
    // self.setDetails = function(event)
    // {
        
    // };
}

cogFilesDetails.controller('cogFilesDetailsCtrl', cogFilesDetailsCtrl);