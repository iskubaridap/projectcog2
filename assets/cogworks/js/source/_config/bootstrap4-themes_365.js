define([], function() {
    return [function(require, module, exports) {
        "use strict";
        module.exports=[ {
            id: "default", name: "Bootstrap", fonts: [], cdn: ["https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"]
        }
        , {
            id: "cerulean", name: "Cerulean", fonts: [], cdn: "https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/cerulean/bootstrap.min.css"
        }
        , {
            id:"cosmo", name:"Cosmo", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700", name: "Source Sans Pro"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/cosmo/bootstrap.min.css"
        }
        , {
            id:"cyborg", name:"Cyborg", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Roboto:400,700", name: "Roboto"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/cyborg/bootstrap.min.css"
        }
        , {
            id:"darkly", name:"Darkly", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Lato:400,700,400italic", name: "Lato"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/darkly/bootstrap.min.css"
        }
        , {
            id:"flatly", name:"Flatly", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Lato:400,700,400italic", name: "Lato"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/flatly/bootstrap.min.css"
        }
        , {
            id:"journal", name:"Journal", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=News+Cycle:400,700", name: "News Cycle"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/journal/bootstrap.min.css"
        }
        , {
            id:"litera", name:"Litera", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Raleway:400,700", name: "Raleway"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/litera/bootstrap.min.css"
        }
        , {
            id:"lumen", name:"Lumen", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,400italic", name: "Source Sans Pro"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/lumen/bootstrap.min.css"
        }
        , {
            id:"mcafee", name:"McAfee", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700", name: "Open Sans"
            }
            ], cdn:""
        }
        , {
            id:"lux", name:"Lux", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Nunito+Sans:400,600", name: "Nunito Sans"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/lux/bootstrap.min.css"
        }
        , {
            id:"materia", name:"Materia", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700", name: "Roboto"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/materia/bootstrap.min.css"
        }
        , {
            id:"minty", name:"Minty", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Montserrat", name: "Montserrat"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/minty/bootstrap.min.css"
        }
        , {
            id: "pulse", name: "Pulse", fonts: [], cdn: "https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/pulse/bootstrap.min.css"
        }
        , {
            id:"sandstone", name:"Sandstone", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Roboto:400,500,700", name: "Roboto"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/sandstone/bootstrap.min.css"
        }
        , {
            id:"simplex", name:"Simplex", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Open+Sans:400,700", name: "Open Sans"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/simplex/bootstrap.min.css"
        }
        , {
            id:"sketchy", name:"Sketchy", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Neucha|Cabin+Sketch", name: "Neucha|Cabin Sketch"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/sketchy/bootstrap.min.css"
        }
        , {
            id: "slate", name: "Slate", fonts: [], cdn: "https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/slate/bootstrap.min.css"
        }
        , {
            id:"solar", name:"Solar", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro", name: "Source Sans Pro"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/solar/bootstrap.min.css"
        }
        , {
            id:"spacelab", name:"Spacelab", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700", name: "Open Sans"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/spacelab/bootstrap.min.css"
        }
        , {
            id:"superhero", name:"Superhero", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Lato:300,400,700", name: "Lato"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/superhero/bootstrap.min.css"
        }
        , {
            id:"united", name:"United", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Ubuntu:400,700", name: "Ubuntu"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/united/bootstrap.min.css"
        }
        , {
            id:"yeti", name:"Yeti", fonts:[ {
                url: "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700", name: "Open Sans"
            }
            ], cdn:"https://maxcdn.bootstrapcdn.com/bootswatch/4.1.3/yeti/bootstrap.min.css"
        }
        ]
    }
    , {}
    ]
}

);