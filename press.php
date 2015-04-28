<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="wrapper-section">
  <h2 class="title-section">Flu Near You Press</h2>

  <h3 class="press-year">2015</h3>
  <ul class="press-list">
    <?php for ($i=0; $i < 20; $i++) { ?>
      <li class="press-item">
        <a href="#" title="Title Here" target="_blank">
          <time>02-24</time>
          <h4 class="press-title">Early flu season accelerates;no peak yet, CDC says</h4>
          <p class="press-forward">dailymail.co.uk</p>
        </a>

        <aside class="press-share">
          <a href="#" title="Share with Facebook" class="facebook">Facebook</a>
          <a href="#" title="Share with Twitter" class="twitter">Twitter</a>
        </aside>
      </li>
    <?php } ?>
  </ul>
</section>

<?php include 'php/includes/footer.inc.php'; ?>
