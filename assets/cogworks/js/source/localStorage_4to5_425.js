define([], function() {
    return [function(require, module, exports) {
        "use strict";
        module.exports=function convert(storage) {
            var panels=[ {
                id:"left-panel", class:"VerticalPanelContainer", collapsed:false, reverse:false, dimensions: {}
                , children:[ {
                    class:"PanelGroup", regularDimensions: {}
                    , collapsedDimensions: {}
                    , children:[ {
                        class: "LookAndFeelOptionsPanel"
                    }
                    , {
                        class: "SettingsPanel"
                    }
                    , {
                        class: "AnimationPanel"
                    }
                    ]
                }
                , {
                    class:"PanelGroup", regularDimensions: {}
                    , collapsedDimensions: {}
                    , children:[ {
                        class: "DesignPanel"
                    }
                    ]
                }
                ]
            }, {
                id:"right-panel", class:"VerticalPanelContainer", collapsed:false, reverse:true, dimensions: {}
                , children:[ {
                    class:"PanelGroup", regularDimensions: {}
                    , collapsedDimensions: {}
                    , children:[ {
                        class: "PodsComponentPanel"
                    }
                    ,{
                        class: "WidgetComponentPanel"
                    }
                    , {
                        class: "WhatNotsComponentPanel"
                    }
                    ]
                }
                , {
                    class:"PanelGroup", regularDimensions: {}
                    , collapsedDimensions: {}
                    , children:[ {
                        class: "OverviewPanel"
                    }
                    ]
                }
                ]
            }
            ];
            if(storage.paneSizes) {
                var paneSizes=JSON.parse(storage.paneSizes);
                var _iteratorNormalCompletion=true;
                var _didIteratorError=false;
                var _iteratorError=undefined;
                try {
                    for(var _iterator=paneSizes[Symbol.iterator](), _step;
                    !(_iteratorNormalCompletion=(_step=_iterator.next()).done);
                    _iteratorNormalCompletion=true) {
                        var pane=_step.value;
                        switch(pane.id) {
                            case"left-panel": panels[0].dimensions.width=pane.size;
                            break;
                            case"right-panel": panels[1].dimensions.width=pane.size;
                            break;
                            case"component-pane": panels[0].children[0].regularDimensions.height=pane.size;
                            break;
                            case"options-pane": panels[1].children[0].regularDimensions.height=pane.size;
                            break;
                            default: break
                        }
                    }
                }
                catch(err) {
                    _didIteratorError=true;
                    _iteratorError=err
                }
                finally {
                    try {
                        if(!_iteratorNormalCompletion&&_iterator["return"]) {
                            _iterator["return"]()
                        }
                    }
                    finally {
                        if(_didIteratorError) {
                            throw _iteratorError
                        }
                    }
                }
            }
            delete storage.paneSizes;
            storage.panels=JSON.stringify(panels);
            storage.version=5;
            return storage
        }
    }
    , {}
    ]
}

);