// URL Helper function
function paddleHelper_urlParam(param) {
    var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	
	return vars[param];
}

// Start Checkout.js
window.PaddleAnalyticsAdded = false;
window.PaddleAnalyticsEnabled = true;
window.PaddleBaseURL = 'https://checkout.paddle.com/';

var _env = 'production';
if(typeof paddleHelper_urlParam('paddle_env') != 'undefined' && paddleHelper_urlParam('paddle_env') != '') {
	_env = paddleHelper_urlParam('paddle_env');
	
	if(_env == 'local') {
		window.PaddleBaseURL = 'https://checkout.paddle.com:8443/';
	} else if(_env == 'staging') {
		window.PaddleBaseURL = 'https://staging-checkout.paddle.com/';
	}
}
	
function setupAnalytics() {
	// Paddle Tracking
	(function (e, t) { if (!t.__SV) { window.calq = t; var n = e.createElement("script"); n.type = "text/javascript"; n.src = "http" + ("https:" === e.location.protocol ? "s" : "") + '://analytics.paddle.com/lib/js/core-1.0.js'; n.async = !0; var r = e.getElementsByTagName("script")[0]; r.parentNode.insertBefore(n, r); t.init = function (e, o) { t.writeKey = e; t._initOptions = o; t._execQueue = []; m = "action.track action.trackSale action.trackHTMLLink action.setGlobalProperty user.profile user.identify user.clear".split(" "); for (var n = 0; n < m.length; n++) { var f = function () { var r = m[n]; var s = function () { t._execQueue.push({ m: r, args: arguments }) }; var i = r.split("."); if (i.length == 2) { if (!t[i[0]]) { t[i[0]] = [] } t[i[0]][i[1]] = s } else { t[r] = s } }(); } }; t.__SV = 1 } })(document, window.calq || []);
	
	calq.init("8fef9120901586b325ae106b6b497bc0");
	calq.action.track("javascript.libraryLoad", {"page":window.location.origin+window.location.pathname, "domain":window.location.host});
	
	window.PaddleAnalyticsAdded = true;
}

// Custom version of the spin.js library (with renamed parameters)
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.PaddleSpinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'PaddleSpinner', // CSS class to assign to the element
    top: '50%',           // center vertically
    left: '50%',          // center horizontally
    position: 'fixed'  // element position
  }

  /** The constructor */
  function PaddleSpinner(o) {
    this.opts = merge(o || {}, PaddleSpinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  PaddleSpinner.defaults = {}

  merge(PaddleSpinner.prototype, {

    /**
     * Adds the PaddleSpinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width

      css(el, {
        left: o.left,
        top: o.top
      })
        
      if (target) {
        target.insertBefore(el, target.firstChild||null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the PaddleSpinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#FFF', '0 0 1px ' + '#FFF'), {top: 1+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(255,255,255,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    PaddleSpinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=1,makeshadow=1,shadowopacity=.2)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    PaddleSpinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return PaddleSpinner

}));

// Spinner Options/ Style
var opts = {
  lines: 9, // The number of lines to draw
  length: 0, // The length of each line
  width: 7, // The line thickness
  radius: 16, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.2, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

function paddleHelper_setCookie(cookieName, cookieValue, expiresDays) {
	var date = new Date();
	
	date.setTime(date.getTime()+(expiresDays*24*60*60*1000));
	var expires = "expires="+date.toUTCString();
	
	if(expiresDays != null) {
		document.cookie = cookieName+"="+cookieValue+"; path=/; "+expires;
	} else {
		document.cookie = cookieName+"="+cookieValue+"; path=/;";
	}
	
	return true;
}

function paddleHelper_getCookie(cookieName) {
	var name = cookieName + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0)==' ') c = c.substring(1);
		if(c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

function paddleHelper_absoluteUrl(path) {
    var link = document.createElement("a");
	link.href = path;
	return link.protocol+"//"+link.host+link.pathname+link.search+link.hash;
}

function paddleHelper_updateUrlParameter(uri, key, value) {
    // remove the hash part before operating on the uri
    var i = uri.indexOf('#');
    var hash = i === -1 ? ''  : uri.substr(i);
         uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;  // finally append the hash as well
}

// Start of the Checkout
function paddleCheckout_init() {
	// Decide on analytics and enable/disable
	$('.paddle_button').each(function() {
		var disableAnalytics = $(this).attr('data-analytics');
		
		if(disableAnalytics == 'disabled') {
			window.PaddleAnalyticsEnabled = false;
		}
	});
	
	// If analytics is enabled, and hasn't already been added - then add it.
	if(window.PaddleAnalyticsEnabled && !window.PaddleAnalyticsAdded) {
		setupAnalytics();
	}
	
	// Allow overlay on Safari now we support cookieless checkout.
	is_popup = true;
	
	// Don't use popup on mobile/ iPad to stop edge cases.
	if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		var is_popup = false;
	}
	
	$('.paddle_button').each(function() {
		if($(this).attr('data-theme') != 'none') {
			switch($(this).attr('data-theme')) {
				case undefined:
				case '':
				case 'default':
				case 'green':
					$(this).addClass('paddle_styled_button').addClass('green');
					break;
				case 'light':
					$(this).addClass('paddle_styled_button').addClass('light');
					break;
				case 'dark':
					$(this).addClass('paddle_styled_button').addClass('dark');
					break;
			}

			switch($(this).attr('data-size')) {
				case undefined:
				case 'normal':
					$(this).addClass('normal');
					break;
				case 'large':
					$(this).addClass('large');
					break;
			}
		}
		
		if(window.PaddleHasReferrer) {
			$(this).attr('data-referrer', window.PaddleReferrer);
		}
		
		if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
			calq.action.track("javascript.buttonImpression", {"page":window.location.origin+window.location.pathname, "domain":window.location.host, "button.theme": $(this).attr('data-theme'), "button.size": $(this).attr('data-size'), "product": $(this).attr('data-product')});
		}
		
		if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled && window.Paddle_isAffiliate && !window.Paddle_AnalyticsTrackedAffiliate) {
			calq.action.track("javascript.Beta.AffiliateVisit", {"page":window.location.origin+window.location.pathname, "domain":window.location.host, "affiliate.token": window.Paddle_affiliateToken});
			window.Paddle_AnalyticsTrackedAffiliate = true;
		}
		
		if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled && window.PaddleHasReferrer && !window.Paddle_AnalyticsTrackedReferrer) {
			calq.action.track("javascript.Beta.CampaignVisit", {"page":window.location.origin+window.location.pathname, "domain":window.location.host, "campaign.string":window.PaddleReferrer});
			window.Paddle_AnalyticsTrackedReferrer = true;
		}
	});

	// Unbind any click events from checkout buttons before we bind our click handler (allows for multiple checkout.js instances on a page)
	$('.paddle_button').unbind('click').click(function(event) {
			// Start Loading Timer
			var paddleLoadStart = new Date().getTime();
			
			// Turn off powered by logo
			var paddlePoweredBy = $(this).attr('data-powered');
			if(paddlePoweredBy == 'false') {
				var showPoweredBy = false;
			} else {
				var showPoweredBy = true;
			}
			
			// Prevent 'scroll to top' when buy buttons are clicked
			event.preventDefault();
			
			var Paddle = {
							 product: $(this).attr('data-product'),
							 success: $(this).attr('data-success'),
							 callback: $(this).attr('data-callback'),
							 internal: $(this).attr('data-internal'), // Support internal checkouts
							 vendor: $(this).attr('data-vendor'), // Pass in vendor_id to internal checkouts
							 plan: $(this).attr('data-plan'), // Plan to subscribe to for internal checkouts
							 queryString: {
							 	 popup: is_popup,
								 parentURL: window.location.href
							 }
						 };
			
			// Track Click
			if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
				calq.action.track("javascript.buttonClick", {"product":Paddle.product, "popup":Paddle.queryString.popup, "button.theme": $(this).attr('data-theme'), "button.size": $(this).attr('data-size'), "page":window.location.origin+window.location.pathname, "domain":window.location.host});
			}
			
			// Conditional arguments in if statements
				// Price
				if($(this).attr('data-price') != undefined && $(this).attr('data-price') != '') {
					Paddle.queryString.price = $(this).attr('data-price');
				}
				
				// Auth
				if($(this).attr('data-auth') != undefined && $(this).attr('data-auth') != '') {
					Paddle.queryString.auth = $(this).attr('data-auth');
				}
				
				// Trial Days
				if($(this).attr('data-trial-days') != undefined && $(this).attr('data-trial-days') != '') {
					Paddle.queryString.trial_days = $(this).attr('data-trial-days');
				}
				
				// Trial Days Auth
				if($(this).attr('data-trial-days-auth') != undefined && $(this).attr('data-trial-days-auth') != '') {
					Paddle.queryString.trial_days_auth = $(this).attr('data-trial-days-auth');
				}
				
				// Guest Email
				if($(this).attr('data-email') != undefined && $(this).attr('data-email') != '') {
					Paddle.queryString.guest_email = $(this).attr('data-email');
				}
				
				// Passthrough
				if($(this).attr('data-passthrough') != undefined && $(this).attr('data-passthrough') != '') {
					Paddle.queryString.passthrough = $(this).attr('data-passthrough');
				}
				
				// Coupon
				if($(this).attr('data-coupon') != undefined && $(this).attr('data-coupon') != '') {
					Paddle.queryString.coupon = $(this).attr('data-coupon');
				}
				
				// Quantity
				if($(this).attr('data-quantity') != undefined && $(this).attr('data-quantity') != '') {
					Paddle.queryString.quantity = $(this).attr('data-quantity');
				}
				
				// Custom Message
				if($(this).attr('data-message') != undefined && $(this).attr('data-message') != '') {
					Paddle.queryString.custom_message = $(this).attr('data-message');
				}
				
				// Referrer
				if($(this).attr('data-referrer') != undefined && $(this).attr('data-referrer') != '') {
					Paddle.queryString.referring_domain = $(this).attr('data-referrer');
				}
				
				// Title
				if($(this).attr('data-title') != undefined && $(this).attr('data-title') != '') {
					Paddle.queryString.title = $(this).attr('data-title');
				}
				
				// Disable Logout
				if($(this).attr('data-disable-logout') != undefined && $(this).attr('data-disable-logout') != '') {
					Paddle.queryString.disable_logout = $(this).attr('data-disable-logout');
				}
			
			// Figure out what to do with the 'Quantity' attribute
			if($(this).attr('data-allow-quantity') == false || $(this).attr('data-allow-quantity') == 'false') {
				Paddle.queryString.quantity_variable = 0;
			} else {
				Paddle.queryString.quantity_variable = 1;
			}
			
			// Parse the URL of this page, and update it so it is the URL without any # parameters.
			Paddle.queryString.parentURL = Paddle.queryString.parentURL.replace(window.location.hash, '');
			Paddle.queryString.parentURL = Paddle.queryString.parentURL.replace('#', '');
	
			// If a _checkoutComplete or _checkoutClose URL var is already set, remove it.
			if(window.location.hash.substring(1) == '_paddle_checkoutComplete') { window.location.hash = ''; }
			if(window.location.hash.substring(1) == '_paddle_checkoutClose') { window.location.hash = ''; }
	
			// If 'data-success' is empty, we just use the 'default' checkout success.
			// Otherwise, we're going to redirect to the URL set in 'data-success'
			if(!Paddle.success) {
				Paddle.queryString.popupCompleted = 'default';
			} else {
				Paddle.queryString.popupCompleted = 'js';
			}
	
			if(Paddle.product || Paddle.internal == 'true') {
				if(Paddle.internal == 'true') {
					Paddle.checkout = window.PaddleBaseURL+'checkout/tool/'+Paddle.plan+'/'+Paddle.vendor+'/?';
					Paddle.checkout += $.param(Paddle.queryString);
				} else {
					// Check if this is an affiliate checkout.
					if(window.Paddle_isAffiliate) {
						// Buffer the checkout URL through the affiliate system.
						Paddle.checkout = 'https://a.paddle.com/checkout/'+window.Paddle_affiliateToken+'/?type=product&product_id='+Paddle.product+'&';
						
						// Add an additional item for the 'data-success' parameter for affiliate checkouts
						// paddleHelper_absoluteUrl converts a relative, or absolute URL (eg. /success/ and http://mysite.com/success/) into a full URL
						if(typeof Paddle.success != 'undefined' && Paddle.success != '') {
							Paddle.queryString.affiliate_success = paddleHelper_absoluteUrl(Paddle.success);
						}
						
						if(typeof Paddle.queryString.referring_domain != 'undefined' && Paddle.queryString.referring_domain != '') {
							Paddle.queryString.referring_domain = 'Affiliate - '+Paddle.queryString.referring_domain;
						} else {
							Paddle.queryString.referring_domain = 'Affiliate';
						}
						
						calq.action.track("javascript.Beta.AffiliateCheckoutStart", {"page":window.location.origin+window.location.pathname, "domain":window.location.host, "campaign.string":Paddle.queryString.referring_domain, "affiliate.token": window.Paddle_affiliateToken});
					} else {
						// Continue to the usual Paddle checkout.
						Paddle.checkout = window.PaddleBaseURL+'checkout/product/'+Paddle.product+'/?';
					}
					
					Paddle.checkout += $.param(Paddle.queryString);
				}
			} else {
				if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
					calq.action.track("javascript.error", {"message":"Missing Product ID", "product":Paddle.product, "popup":Paddle.queryString.popup, "page":window.location.origin+window.location.pathname, "domain":window.location.host});
				}
			}
			
			// Allow the URL we use for the frame to be overridden.
			if($(this).attr('data-override') != undefined && $(this).attr('data-override') != '') {
				Paddle.checkout = $(this).attr('data-override');
				
				if(typeof Paddle.queryString.referring_domain != 'undefined' && Paddle.queryString.referring_domain != '') {
					Paddle.checkout = paddleHelper_updateUrlParameter(Paddle.checkout, 'referring_domain', encodeURIComponent(Paddle.queryString.referring_domain));
				}
			}
	
			// Remove any other instances of checkout, then show preloader and initiate frame.
			if(is_popup) {
				// If we're a "popup" checkout, then load a frame.
				$('.paddle_checkout_frame').remove();
				$('#paddleLoader').hide().fadeIn(300);
				$('body').append('<iframe id="pf_'+Paddle.product+'" class="paddle_frame paddle_checkout_frame" frameborder="0" allowtransparency="true" style="z-index: 99999; display: block; background-color: transparent; border: 0px none transparent; overflow-x: hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%;" src="'+Paddle.checkout+'"></iframe>');
				
				// Hide the frame until it's loaded, then fade in. (Stops white iframe flash)
				$('#pf_'+Paddle.product+'').css({opacity:0});
				$('#pf_'+Paddle.product+'').load(function() {
					// Complete Loading Time (and calculate load time in seconds)
					var paddleLoadEnd = new Date().getTime();
					var paddleLoadTime = parseFloat(((paddleLoadEnd-paddleLoadStart)/1000).toFixed(3));
					
					if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
						calq.action.track("javascript.frameLoad", {"product":Paddle.product, "popup":Paddle.queryString.popup, "page":window.location.origin+window.location.pathname, "domain":window.location.host, "loadTime":paddleLoadTime});
					}
					
					setTimeout(function() {
						if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
							calq.action.track("javascript.poweredByShown", {"page":window.location.origin+window.location.pathname, "domain":window.location.host});
						}
						
						if(showPoweredBy) {
							$('.paddle_powered').fadeIn(350);
						}
					}, 1000);
					
					$('#paddleLoader').fadeOut(100);
					$('#pf_'+Paddle.product+'').animate({opacity:1});
				});
			} else {
				// Still show the loader if we're not a popup
				$('#paddleLoader').hide().fadeIn(300);
				
				// If we're not a "popup" checkout (eg. safari) then just visit the checkout URL.
				if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
					calq.action.track("javascript.redirect", {"product":Paddle.product, "popup":Paddle.queryString.popup, "page":window.location.origin+window.location.pathname, "domain":window.location.host});
				}
				
				window.location.href = Paddle.checkout;
			}
			
			// Handle frame closes with push message.
			// Create IE + others compatible event handler
			var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
			var eventer = window[eventMethod];
			var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

			// Listen to message from child window
			eventer(messageEvent, function(event) {				
				if(event.data.action == 'complete') {
					if(Paddle.queryString.popupCompleted == 'js') {
					    if(Paddle.success) {
					    	// Fade out & remove the elements from the page on _checkoutComplete call (make the redirect look nicer/ transition)
							$('.paddle_frame').fadeOut(350, function() {
								$('#paddleLoader').hide();
							});
							
							if(showPoweredBy) {
								$('.paddle_powered').fadeOut(600);
							}
							
							if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
								calq.action.track("javascript.frameComplete", {"page":window.location.origin+window.location.pathname, "domain":window.location.host});
							}
	
							// Redirect to 'success' URL
							if(!window.Paddle_isAffiliate) {
								window.location.href=Paddle.success;
							}
						}
					} else {
						// Fire the callback function with the 'complete' status, if it's set.
						if(Paddle.callback) {
							// Fade out & remove the elements from the page on _checkoutComplete call (make the redirect look nicer/ transition)
							$('.paddle_frame').fadeOut(350, function() {
								$('#paddleLoader').hide();
							});
							
							if(showPoweredBy) {
								$('.paddle_powered').fadeOut(600);
							}
							
							window[Paddle.callback]({"status":"complete", "data":event.data.callback_data});
						}
					}
				} else if(event.data.action == 'close') {					
					// Fire the callback function with the 'cancelled' status, if it's set.
					if(Paddle.callback) {
						window[Paddle.callback]({"status":"cancelled"});
					}
					
					// Fade out & remove the elements from the page on _checkoutClose call
					$('.paddle_frame').fadeOut(350, function() {
						$('#paddleLoader').hide();
					});
					
					if(showPoweredBy) {
						$('.paddle_powered').fadeOut(600);
					}
					
					if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
						calq.action.track("javascript.frameClose", {"page":window.location.origin+window.location.pathname, "domain":window.location.host});
					}
				}
			}, false);
	});
}

$(document).ready(function() {
	// Load stylesheet for button theming.
	$('head').append('<link rel="stylesheet" type="text/css" href="https://paddle.s3.amazonaws.com/checkout/checkout.css" />');
		
	// Load a spinner div (but keep it hidden)
	$('body').append('<div id="paddleLoader" style="display:none;"></div>');
	var target = document.getElementById('paddleLoader');
	var spinner = new PaddleSpinner(opts).spin(target);
	
	// Flag so we only fire analytics data about our affiliate/campaign beta once per page load
	window.Paddle_AnalyticsTrackedAffiliate = false;
	window.Paddle_AnalyticsTrackedReferrer = false;
	
	// Referral/campaign tracking
	window.PaddleHasReferrer = false;
	window.PaddleReferrer = false;
	window.PaddleReferrerCookie = false;
	if(typeof paddleHelper_urlParam('paddle_ref') != 'undefined' && paddleHelper_urlParam('paddle_ref') != 'undefined' && paddleHelper_urlParam('paddle_ref') != '') {
		window.PaddleHasReferrer = true;
		window.PaddleReferrer = 'Campaign: '+window.location.host+' - '+paddleHelper_urlParam('paddle_ref');
		
		paddleHelper_setCookie('paddle_ref', window.PaddleReferrer, 30);
	} else {
		window.PaddleHasReferrer = false;
		window.PaddleReferrer = '';
		window.PaddleReferrerCookie = paddleHelper_getCookie('paddle_ref');
		
		if(window.PaddleReferrerCookie != '' && paddleHelper_getCookie('paddle_ref') != 'undefined' && typeof paddleHelper_getCookie('paddle_ref') != 'undefined') {
			window.PaddleHasReferrer = true;
			window.PaddleReferrer = window.PaddleReferrerCookie;
		}
	}
	
	// Set affiliate cookies and affiliate 'checkout buffer'
	window.Paddle_isAffiliate = false;
	if(typeof paddleHelper_urlParam('p_tok') != 'undefined' && paddleHelper_urlParam('p_tok') !='') {
		var p_token = paddleHelper_urlParam('p_tok');
				
		paddleHelper_setCookie('p_aff', p_token, 90);
		
		window.Paddle_isAffiliate = true;
		window.Paddle_affiliateToken = p_token;
	}
	
	// Detect existing affiliate cookies and set globals
	if(paddleHelper_getCookie('p_aff') != '') {
		window.Paddle_isAffiliate = true;
		window.Paddle_affiliateToken = paddleHelper_getCookie('p_aff');
	}
	
	// Load powered by paddle (but keep it hidden)
	$('body').append(
	    $('<div>')
	    .addClass('paddle_powered')
	    .css({
	        position: 'fixed',
	        zIndex: '99999999',
	        left: '20px',
	        bottom: '8px',
	        display: 'none'
	    })
	    .append(
	        $('<a>')
	            .attr('href', 'https://www.paddle.com/features/checkout/?utm_source=Referral_'+window.location.host+'&utm_campaign=CheckoutReferral&utm_medium=CheckoutReferral&utm_content=Referral_'+window.location.host)
	            .attr('target', '_blank')
	            .append(
	                $('<img>')
	                .attr('src', 'https://paddle.s3.amazonaws.com/checkout/assets/powered-by-paddle.png')
	                .css({
	                    height: '32px',
						width: '220px'
	                })
				)
				.click(function() {
					if(window.PaddleAnalyticsAdded && window.PaddleAnalyticsEnabled) {
						calq.action.track("javascript.poweredByClicked", {"page":window.location.origin+window.location.pathname, "domain":window.location.host});
					}
				})
		)
	);
	
	// Add a DNS pre-fetch
	$('head').append('<link rel="dns-prefetch" href="//checkout.paddle.com" />');
	
	// Indicate setup is complete for legacy migration
	window.PaddleCheckoutInit = true;
	
	// Loop through checkout buttons on the page and style them according to their 'data' attributes.
	paddleCheckout_init();
});

// Polyfill console.warn() for older browsers
var console = console || {
    "warn": function(message) {}
};

// Add a console.warn() message that the dev should upgrade to Paddle.js
console.warn("You're using the old Paddle Checkout implementation Checkout.js! It's *highly* reccommended that you upgrade to the new Paddle.js - migration takes 2-3 minutes, see the docs for more info: http://paddle.io/1U6aCsp");