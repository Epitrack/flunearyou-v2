<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section" ng-controller="PressCtrl">
  <h2 class="title-section">Flu Near You Press</h2>

  <div class="row">

    <!-- 2015 -->
    <aside class="col-xs-12 col-sm-4 col-md-6 press-year">
      <h3 class="year">2015</h3>

      <ul class="press-list">
        <li class="press-item" ng-repeat="press in pressFeeds">
          <a class="press-link" href="{{press.link}}" title="{{ press.titulo }}" target="_blank">
            <time datetime="{{ press.time }}">{{ press.date }}</time>
            <div class="press-info">
              <h4 class="press-title">{{ press.titulo }}</h4>
              <p class="press-source">{{ press.site }}</p>
            </div>
          </a>

          <aside class="press-share">
            <a href="{{press.link}}" title="Share with Facebook" class="facebook">Facebook</a>
            <a href="{{press.link}}" title="Share with Twitter" class="twitter">Twitter</a>
          </aside>
        </li>
      </ul>
    </aside>

    <!-- 2014 -->
    <aside class="col-xs-12 col-sm-4 col-md-6 press-year">
      <h3 class="year">2014</h3>

      <ul class="press-list">
        <li class="press-item" ng-repeat="press in pressFeeds">
          <a class="press-link" href="{{press.link}}" title="{{ press.titulo }}" target="_blank">
            <time datetime="{{ press.time }}">{{ press.date }}</time>
            <div class="press-info">
              <h4 class="press-title">{{ press.titulo }}</h4>
              <p class="press-source">{{ press.site }}</p>
            </div>
          </a>

          <aside class="press-share">
            <a href="{{press.link}}" title="Share with Facebook" class="facebook">Facebook</a>
            <a href="{{press.link}}" title="Share with Twitter" class="twitter">Twitter</a>
          </aside>
        </li>
      </ul>
    </aside>

    <!-- 2013 -->
    <aside class="col-xs-12 col-sm-4 col-md-6 press-year">
      <h3 class="year">2013</h3>

      <ul class="press-list">
        <li class="press-item" ng-repeat="press in pressFeeds">
          <a class="press-link" href="{{press.link}}" title="{{ press.titulo }}" target="_blank">
            <time datetime="{{ press.time }}">{{ press.date }}</time>
            <div class="press-info">
              <h4 class="press-title">{{ press.titulo }}</h4>
              <p class="press-source">{{ press.site }}</p>
            </div>
          </a>

          <aside class="press-share">
            <a href="{{press.link}}" title="Share with Facebook" class="facebook">Facebook</a>
            <a href="{{press.link}}" title="Share with Twitter" class="twitter">Twitter</a>
          </aside>
        </li>
      </ul>
    </aside>

  </div>

</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
