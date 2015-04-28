<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="wrapper-section">
  <h2 class="title-section">Frequently Asked Questions about Flu Near You</h2>

  <form action="#" class="form faq">
    <label for="search-term">What's your question?</label>
    <input id="search-term" type="text" placeholder="Enter a search term" class="input-primary large">
    <span id="count-result" class="count-result">Search</span>
  </form>

  <section id="questions" class="questions">
    <ul>
      <?php for ($i=0; $i < 20; $i++) {?>
        <li>
          <h4 class="questions-title">What is Flu Near You?</h4>
          <p class="questions-description">
            Flu Near You is a website and mobile application that allows the public to report their health information using a quick weekly survey. Using participant-reported symptoms, Flu Near You graphs and maps this information to provide local and national views of influenza-like illness.
          </p>
        </li>
      <?php } ?>
    </ul>
  </section>

  <?php include 'php/includes/joinUs.inc.php'; ?>
</section>

<?php include 'php/includes/footer.inc.php'; ?>
