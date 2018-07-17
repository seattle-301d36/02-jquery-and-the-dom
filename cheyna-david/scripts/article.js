'use strict';

let articles = [];

// TODone COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of
// "this" within the function. What does "rawDataObj" represent?
// ANS: The following is a constructor function that creates an Article instance, which why it is capitalized.  This
// refers to the instances attributes. rawDataObj is a parameter of the constructor function, and it contains

function Article(rawDataObj) {
  // TODone: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function () {
  // TODone COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  /** ANS: The articles all have a common structure represented by html elements, like author, date, title.
   * Cloning reduces repetitive tasks of creating each, for each article.
   */

  let $newArticle = $('article.template').clone();
  /** TODone: This cloned article still has a class of template. In our modules.css stylesheet, we should give all
   * elements with a class of template a display of none so that our template does not display in the browser.
   * But, we also need to make sure we're not accidentally hiding our cloned article.
   */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODone: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values
   of the properties of this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */
  $newArticle.find('a').html(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('section').html(this.body);
  $newArticle.find('time').html(this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

$(document).ready(function () {
  rawData.sort(function (a, b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  // TODone: Refactor these for loops using the .forEach() array method.
  rawData.forEach(function (element) {
    articles.push(new Article(element));
  });

  articles.forEach(function (rawData) {
    $('#articles').append(rawData.toHtml());
  })
});