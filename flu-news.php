<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="wrapper-section">
  <h2 class="title-section">Flu News</h2>

  <ul class="news-list">
    <?php for ($i=0; $i < 20; $i++) { ?>
      <li class="news-item">
        <a href="#" title="Can You Believe Flu Season Still Isn't Over?" target="_blank">
          <figure class="news-image">
            <img src="http://dummyimage.com/260x180/4d494d/686a82.gif&text=placeholder+image" alt="placeholder+image">
          </figure>
        </a>

        <time>04-23</time>
        <h3 class="news-title">
          <a href="#" title="Can You Believe Flu Season Still Isn't Over?">Can You Believe Flu Season Still Isn't Over?</a>
        </h3>
        <p class="news-description">
          Flu season still isn't over, and a new strain of flu virus has taken
          over to make people miserable in the early days of spring, federal
          officials said ...
        </p>

        <a href="#" title="Read More" target="_blank" class="read-more">Read More</a>
      </li>
    <?php } ?>
  </ul>
</section>

<?php include 'php/includes/footer.inc.php'; ?>
