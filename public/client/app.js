window.Shortly = Backbone.View.extend({
  template: Templates['layout'],

  events: {
    'click li a.index': 'renderIndexView',
    'click li a.create': 'renderCreateView',
    'click li.logout': 'logout'
  },

  initialize: function() {
    console.log( 'Shortly is running' );
    $('body').append(this.render().el);

    this.router = new Shortly.Router({ el: this.$el.find('#container') });
    this.router.on('route', this.updateNav, this);

    Backbone.history.start({ pushState: true });
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e) {
    console.log('in render index view');
    e && e.preventDefault();
    this.router.navigate('/', { trigger: true });
  },

  renderLoginView: function(e) {
    e && e.preventDefault();
    this.router.navigate('/login', { trigger: true });
  },

  renderCreateView: function(e) {
    e && e.preventDefault();
    this.router.navigate('/create', { trigger: true });
  },

  updateNav: function(routeName) {
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  },

  logout: function(e) {
    //send post request to server for logout
    Backbone.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'http://127.0.0.1:4568/logout',
      success: function(val) {
        //this.renderLoginView(e);
        console.log('GET to server logout successful');
      }
    });
  }
});
