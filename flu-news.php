<?php $class = 'bg-primary'; include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section">
  <h2 class="title-section">Flu News</h2>

  <div class="row">

    <div id="flu-news-feeds"></div>

    <div class="col-xs-12">
      <a href="http://www.scoop.it" class="scoopit-logo" target="_blank" title="Scoop.it">
        <figure>
          <img src="https://www.scoop.it/resources/img/V4/api/poweredbyscoopit_35_transp.png" alt="Scoop.it Logo">
        </figure>
      </a>
    </div>

  </div>

</section>

<script id="flu-news-template" type="text/x-handlebars-template">
  {{#each news}}
    <div class="col-xs-12 col-sm-4 col-md-3">
      <article class="news-item">
        <a href="{{ url }}" title="{{ title }}" target="_blank" class="news-link-image">
          <figure class="news-image">
            <img src="{{ image }}" alt="{{ title }}">
          </figure>
        </a>

        <time datetime="{{ day }} {{ month }}" class="news-date">
          {{ day }} <span>{{ month }}</span>
        </time>

        <div class="news-text">
          <h3 class="news-title">
            <a href="{{ url }}" target="_blank" title="{{ title }}">{{ title }}</a>
          </h3>

          <p class="news-description"> {{ content }} </p>
        </div>

        <a href="{{ url }}" title="Read More" target="_blank" class="read-more"> Read More </a>
      </article>
    </div>
  {{/each}}
</script>

<?php include 'php/includes/joinUs.inc.php'; ?>
<?php include 'php/includes/footer.inc.php'; ?>
