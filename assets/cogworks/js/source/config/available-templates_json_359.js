define([], function() {
    return [function(require, module, exports) {
        module.exports= {
            3:[ {
                id: "blank", name: "Blank", description: "", type: "regular"
            }, {
                id: "blog-post-page", name: "Blog Post Page", description: "", type: "regular", pages: []
            }, {
                id: "production_template", name: "Production Template", description: "", type: "regular", pages: []
            }, {
                id: "video_no_quiz_template", name: "Video No Quiz Template", description: "", type: "regular", pages: []
            }, {
                id: "jsi_wrapper", name: "JSI Wrapper", description: "", type: "regular", pages: []
            }
            ], 4:[ {
                id: "blank", name: "Blank", description: "", type: "regular"
            }
            , {
                id: "production_template", name: "Production Template", description: "", type: "advanced", placeholders:[ {
                        name: "Brand", placeholder: "brand", default: "Brand", tooltip: "The Brand is displayed in your Navbar, and is included in page titles.", type: "input"
                    }
                    , {
                        name: "Description", placeholder: "description", default: "", tooltip: "The Description is included as a meta tag in your site. You can edit it later in Settings.", type: "textarea"
                    }
                ], pages: [{
                  "id": "last-page",
                  "name": "Last Page",
                  "description": "",
                  "path": "lastPage.html",
                  "navbar": true,
                  "weight": 0
                }, {
                  "id": "page-cover",
                  "name": "Page Cover",
                  "description": "",
                  "path": "page-cover.html",
                  "navbar": false,
                  "weight": 1
                }, {
                  "id": "page-dark-gray",
                  "name": "Page Dark Gray",
                  "description": "",
                  "path": "page-dark-gray.html",
                  "navbar": false,
                  "weight": 2
                }, {
                  "id": "page-dark-gray2",
                  "name": "Page Dark Gray 2",
                  "description": "",
                  "path": "page-dark-gray2.html",
                  "navbar": false,
                  "weight": 3
                }, {
                  "id": "page-img-slider",
                  "name": "Page Image Slider",
                  "description": "",
                  "path": "page-img-slider.html",
                  "navbar": false,
                  "weight": 4
                }, {
                  "id": "page-magnifiying-img",
                  "name": "Page Magnifying Image",
                  "description": "",
                  "path": "page-magnifiying-img.html",
                  "navbar": false,
                  "weight": 5
                }, {
                  "id": "page-play-audio",
                  "name": "Page Play Audio",
                  "description": "",
                  "path": "page-play-audio.html",
                  "navbar": false,
                  "weight": 6
                }, {
                  "id": "page-play-video",
                  "name": "Page Play Video",
                  "description": "",
                  "path": "page-play-video.html",
                  "navbar": false,
                  "weight": 7
                }, {
                  "id": "page-pre-quiz",
                  "name": "Page Pre Quiz",
                  "description": "",
                  "path": "page-pre-quiz.html",
                  "navbar": false,
                  "weight": 8
                }, {
                  "id": "page-show-PDF",
                  "name": "Page Show PDF",
                  "description": "",
                  "path": "page-show-PDF.html",
                  "navbar": false,
                  "weight": 9
                }, {
                  "id": "page-special",
                  "name": "Page Special",
                  "description": "",
                  "path": "page-special.html",
                  "navbar": false,
                  "weight": 10
                }, {
                  "id": "page-with-submit-btn",
                  "name": "Page with Submit Button",
                  "description": "",
                  "path": "page-with-submit-btn.html",
                  "navbar": false,
                  "weight": 11
                }, {
                  "id": "quiz-drag-drop",
                  "name": "Quiz Drag and Drop",
                  "description": "",
                  "path": "quiz-drag-drop.html",
                  "navbar": false,
                  "weight": 12
                }, {
                  "id": "quiz-multiple-choice",
                  "name": "Quiz Multiple Choice",
                  "description": "",
                  "path": "quiz-multiple-choice.html",
                  "navbar": false,
                  "weight": 13
                }, {
                  "id": "quiz-true-false",
                  "name": "Quiz True or False",
                  "description": "",
                  "path": "quiz-true-false.html",
                  "navbar": false,
                  "weight": 14
                }, {
                  "id": "style-guide-banner",
                  "name": "Style Guide Banner",
                  "description": "",
                  "path": "style-guide-banner.html",
                  "navbar": false,
                  "weight": 15
                }, {
                  "id": "style-guide-blks-imgs-statistics-partner-rotating-cta",
                  "name": "Style CTA",
                  "description": "",
                  "path": "style-guide-blks-imgs-statistics-partner-rotating-cta.html",
                  "navbar": false,
                  "weight": 16
                }, {
                  "id": "style-guide-resources",
                  "name": "Style Guide Resources",
                  "description": "",
                  "path": "style-guide-resources.html",
                  "navbar": false,
                  "weight": 17
                }, {
                  "id": "style-guide-share-options-footer",
                  "name": "Style Footer",
                  "description": "",
                  "path": "style-guide-share-options-footer.html",
                  "navbar": false,
                  "weight": 18
                }, {
                  "id": "style-guide-text-colors-buttons",
                  "name": "Style Text Colors and Buttons",
                  "description": "",
                  "path": "style-guide-text-colors-buttons.html",
                  "navbar": false,
                  "weight": 19
                }]
            },{
                id:"clean-sky", name:"Clean Sky", description:"", type:"advanced", premium:true, placeholders:[ {
                    name: "Brand", placeholder: "brand", default: "Brand", tooltip: "The Brand is displayed in your Navbar, and is included in page titles.", type: "input"
                }
                , {
                    name: "Description", placeholder: "description", default: "", tooltip: "The Description is included as a meta tag in your site. You can edit it later in Settings.", type: "textarea"
                }
                ], pages:[ {
                    id: "about-us", name: "About Us", description: "", path: "about-us.html", navbar: true, weight: 14
                }
                , {
                    id: "blog-post-list", name: "Blog", description: "", path: "blog-post-list.html", navbar: false, weight: 9
                }
                , {
                    id: "blog-post", name: "Blog Post", description: "", path: "blog-post.html", navbar: false, weight: 10
                }
                , {
                    id: "catalog-page", name: "Catalog", description: "", path: "catalog-page.html", navbar: false, weight: 1
                }
                , {
                    id: "contact-us", name: "Contact", description: "", path: "contact-us.html", navbar: true, weight: 15
                }
                , {
                    id: "faq", name: "FAQ", description: "", path: "faq.html", navbar: false, weight: 8
                }
                , {
                    id: "features", name: "Features", description: "", path: "features.html", navbar: true, weight: 3
                }
                , {
                    id: "gallery", name: "Gallery", description: "", path: "gallery.html", navbar: false, weight: 5
                }
                , {
                    id: "index", name: "Home", description: "", path: "index.html", navbar: true, weight: 0
                }
                , {
                    id: "login", name: "Login", description: "", path: "login.html", navbar: false, weight: 16
                }
                , {
                    id: "payment-page", name: "Payment", description: "", path: "payment-page.html", navbar: false, weight: 12
                }
                , {
                    id: "pricing", name: "Pricing", description: "", path: "pricing.html", navbar: true, weight: 4
                }
                , {
                    id: "product-page", name: "Product Page", description: "", path: "product-page.html", navbar: false, weight: 11
                }
                , {
                    id: "registration", name: "Register", description: "", path: "registration.html", navbar: false, weight: 17
                }
                , {
                    id: "service-page", name: "Services", description: "", path: "service-page.html", navbar: false, weight: 2
                }
                , {
                    id: "shopping-cart", name: "Shopping Cart", description: "", path: "shopping-cart.html", navbar: false, weight: 13
                }
                , {
                    id: "slider", name: "Gallery With Slider", description: "", path: "slider.html", navbar: false, weight: 6
                }
                , {
                    id: "testimonials", name: "Testimonials", description: "", path: "testimonials.html", navbar: false, weight: 7
                }
                ], widgets:[ {
                    name: "Headers and Footers", children: ["Header Blue", "Header Dark", "Header White", "Footer Dark", "Footer White"]
                }
                , {
                    name: "Forms", children: ["Contact Us Form", "Login Form", "Registration Form"]
                }
                , {
                    name: "Sections", children: ["About Us", "Features", "Info Block"]
                }
                , {
                    name: "Banners", children: ["Call To Action Blue", "Call To Action", "Newsletter Sign Up Blue", "Newsletter Sign Up", "Social Icons Blue", "Social Icons", "Partners"]
                }
                ]
            }
            ]
        }
    }
    , {}
    ]
}

);