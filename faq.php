<?php $class = 'bg-primary'; include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section">
  <h2 class="title-section">Frequently Asked Questions about Flu Near You</h2>

  <div class="row">
    <form action="#" class="form faq col-xs-12">
      <label class="search-term" for="search-term">What's your question?</label>
      <input id="search-term" type="text" placeholder="Enter a search term" class="input-primary medium">
      <span id="count-result" class="count-result">Search</span>
    </form>

    <section id="questions" class="col-xs-12 questions"></section>
  </div>
</section>

<script id="faq-template" type="text/x-handlebars-template">
  <ul>
    {{#each faq}}
      <li class="faq-item col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <input class="faq-input" id="faq-input-{{ id }}" name="accordion-faq" type="radio" />
        <label for="faq-input-{{ id }}" class="questions-title">{{ ask }}</label>
        <p id="answer-{{ id }}" class="questions-description">{{ answer }}</p>
      </li>
    {{/each}}
  </ul>
</script>

<?php include 'php/includes/joinUs.inc.php'; ?>
<?php include 'php/includes/footer.inc.php'; ?>
