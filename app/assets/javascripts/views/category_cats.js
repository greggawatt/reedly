Reedly.Views.CategoryView = Backbone.View.extend({
  tagName: 'ul',
  template: JST["feed_categories/categories"],

  initialize: function(){
    this.listenTo(this.collection, "all", this.render);
  },

  events: {
    "click .remove-category-feed" : "destroy",
    "click .add-category-button" : "addCategory",
    "click .delete-category" : "destroyCategory"
  },

  render: function(){    
    var rendered = this.template({
      categories: this.collection
    });
    this.$el.html(rendered);
    return this
  },

  destroyCategory: function(event){
    var that = this;
    $(event.currentTarget).parent().parent().parent().fadeOut(400, function(){
      var feed = that.collection.get(event.currentTarget.id);
      that.collection.get($(event.currentTarget).data("category-id")).destroy();
    }); 
  },

  destroy: function(event){
    var that = this;
    var feedId = $(event.currentTarget).data("feed-id");
    $(event.currentTarget).parent().fadeOut(400, function(){
      $.ajax({
        url: "/feeds/" + feedId,
        type: "delete",
        success: function () {
          that.collection.fetch();
        }
      });
    });
  },

  addCategory: function(event){
    event.preventDefault();
    var newCategory = $('input[name=category\\[title\\]]').val();
    this.collection.create({
      title: newCategory
    } ,{
      wait: true
    });
    $('.add-category').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.collection.fetch();
  },

 
  
})