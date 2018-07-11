'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE
// The purpose is to be able to pass in multiple objects into one function and any methods can be attached to the prototype and shared to save memory. It's capitalized because it's convention for constructors. This represents whatever the current object is. rawDataObj is the object being passed in. 

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
    this.title = rawDataObj.title,
    this.category = rawDataObj.category,
    this.author = rawDataObj.author,
    this.authorUrl = rawDataObj.authorUrl,
    this.publishedOn = rawDataObj.publishedOn,
    this.body = rawDataObj.body
}



Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // .clone() is a convenient way to duplicate elements in the dom.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
      $('#articles').find('a').text(this.author);
      $('#articles').find("a[href]").text(this.authorUrl);
      $('#articles').find('h1').text(this.title);
      $('#articles').find('.article-body').text(this.body);
      $('#articles').find('time[datetime]').text(this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

// for(let i = 0; i < rawData.length; i++) {
//   articles.push(new Article(rawData[i]));
// }

articles.forEach((i) => {
  articles.push(new Article(rawData[i]));
});

// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }

articles.forEach((i) => {
  $('#articles').append(articles[i].toHtml());
});
