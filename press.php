<?php $class = 'bg-primary'; include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section">
  <h2 class="title-section">Flu Near You Press</h2>

  <div class="row">

    <!-- 2015 -->
    <aside class="col-xs-12 col-sm-4 col-md-6 press-year">
      <h3 class="year">2015</h3>

      <ul class="press-list" id="press-list"></ul>
    </aside>

  </div>

</section>

<script id="press-template" type="text/x-handlebars-template">
  <ul>
    {{#each press}}
      <li class="press-item">
        <a class="press-link" href="{{ link }}" title="{{ title }}" target="_blank">
          <time datetime="{{ time }}">{{ date }}</time>
          <div class="press-info">
            <h4 class="press-title">{{ title }}</h4>
            <p class="press-source">{{ site }}</p>
          </div>
        </a>

        <aside class="press-share">
          <a href="{{ link }}" title="Share with Facebook" class="facebook">Facebook</a>
          <a href="{{ link }}" title="Share with Twitter" class="twitter">Twitter</a>
        </aside>
      </li>
    {{/each}}
  </ul>
</script>

<?php include 'php/includes/joinUs.inc.php' ?>
<?php include 'php/includes/footer.inc.php'; ?>
