<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<main class="section">

  <section class="news">
    <h2 class="title-section">Keep up-to-date with our news</h2>
    <!-- feed scoopit-->
    <a href="/flu-news" class="btn btn-secondary medium" title="Read More">Read More News</a>
  </section>

  <!-- About Tabs -->
  <div class="row">
    <?php include 'php/includes/aboutTabs.inc.php' ?>
  </div>

  <!-- Join Us -->
  <?php include 'php/includes/joinUs.inc.php'; ?>

  <section class="complementary-info">
    <div>
      <h3 class="title-primary medium">Get a flu shot</h3>
      <p class="description">Enter your postal code to locate a vaccination center:</p>

      <form action="#" class="vaccination-form">
        <input type="number" class="input-primary medium" placeholder="Enter your postal code">
        <input type="submit" class="btn-primary btn submit" value="search">
      </form>
    </div>

    <div>
      <h3 class="title-primary medium">Public Health near you</h3>

      <ul class="some-news">
        <li><a href="#" title="" target="_blank">United States Agency for Toxic Substances and Disease Registry</a></li>
        <li><a href="#" title="" target="_blank">United States CDC_Travellers' Health</a></li>
        <li><a href="#" title="" target="_blank">United States Centres for Disease Control and Prevention</a></li>
      </ul>
    </div>
  </section>

</main>

<?php include 'php/includes/footer.inc.php'; ?>
