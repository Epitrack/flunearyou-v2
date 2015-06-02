<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<main class="wrapper-section">
  <section class="primary">
    <!-- Databox -->
    <aside id="databox" class="databox">
      <h4>Flu Activity in:</h4>

      <select name="" id="databox-country" class="databox-country">
        <option value="Brazil">Brazil</option>
        <option value="Italy">Italy</option>
        <option value="United States">United States</option>
      </select>

      <figure id="databox-image" class="databox-image">
        <img src="http://dummyimage.com/293x150/4d494d/686a82.gif&text=placeholder+image" alt="placeholder+image">
      </figure>

      <h3 id="reports-of-week" class="reports-of-week">8583 reports this week</h3>

      <ul class="legend-list">
        <li class="legend-item">
          <span class="legend-value">156</span>
          <span class="legend-description">Flu-like Symptoms 2%</span>
          <span class="more-info">Fewer participants are reporting flu-like symptoms this week than last</span>
        </li>

        <li class="legend-item">
          <span class="legend-value">958</span>
          <span class="legend-description">Any Symptoms 11%</span>
        </li>

        <li class="legend-item">
          <span class="legend-value">7625</span>
          <span class="legend-description">No Symptoms 89%</span>
        </li>
      </ul>
    </aside>

    <!-- Form -->
    <aside class="other-databox">
      <h2 class="title-primary"> Spread the word. <span>Not the flu.</span> </h2>

      <form action="#" id="form-primary" class="form-primary">
        <input type="number" class="input-primary small" placeholder="Enter your City or Zipcode">
        <input type="submit" class="btn btn-submit" value="check for flu">
      </form>

      <ul>
        <li>Join thousands who are helping report flu.</li>
        <li>Protect yourself, your family & your community.</li>
        <li>Ready to report? Let's hear from you.</li>
      </ul>
    </aside>

    <!-- Map area -->
    <div id="map-area">
      <div class="databox-plus">
        <fieldset>
         <input type="radio" name="state_viewtype" value="user" checked="checked" id="state_viewtype_user">
         <label for="state_viewtype_user">User Contributed Flu Activity</label><br>
       </fieldset>

       <fieldset>
         <input type="radio" name="state_viewtype" value="flu" id="state_viewtype_flu">
         <label for="state_viewtype_flu"> CDC Flu Activity</label>
       </fieldset>
      </div>

      <!-- Map -->
      <div id="map-primary"></div>
    </div>

    <!-- Learn more -->
    <div class="learn-more">
      <h3><span>Flu Near You</span> is a community health project for North America.</h3>
      <a href="#">Learn more about how it works</a>
    </div>
  </section>

  <section class="news">
    <h2 class="title-section">Keep up-to-date with our news</h2>

    <ng-view></ng-view>

    <a href="/flu-news" class="btn btn-secondary medium" title="Read More">Read More News</a>
  </section>

  <?php include 'php/includes/aboutTabs.inc.php'; ?>
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
