<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section" ng-controller="FluNewsCtrl">
  <h2 class="title-section">Flu News</h2>

  <div class="row">

    <div class="col-xs-12 col-sm-4 col-md-3 ng-scope" ng-repeat="news in newsFeeds">
      <article class="news-item">
        <a href="{{ news.url }}" title="{{ news.title }}" target="_blank" class="news-link-image">
          <figure class="news-image">
            <img src="{{ news.imageUrl }}" alt="{{ news.title }}">
          </figure>
        </a>

        <time datetime="{{ news.time }}" class="news-date">
          {{ news.publicationDateDay }} <span>{{ news.publicationDateMonth }}</span>
        </time>

        <div class="news-text">
          <h3 class="news-title">
            <a href="{{ news.url }}" target="_blank" title="{{ news.title }}">{{ news.title }}</a>
          </h3>

          <p class="news-description"> {{ news.content }} </p>
        </div>

        <a href="{{ news.url }}" title="Read More" target="_blank" class="read-more"> Read More </a>
      </article>
    </div>

    <div class="col-xs-12">
      <a href="http://www.scoop.it" class="scoopit-logo" target="_blank" title="Scoop.it">
        <figure>
          <img src="https://www.scoop.it/resources/img/V4/api/poweredbyscoopit_35_transp.png" alt="Scoop.it Logo">
        </figure>
      </a>
    </div>

  </div>

</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
