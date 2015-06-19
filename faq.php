<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section" ng-controller="FaqCtrl">
  <h2 class="title-section">Frequently Asked Questions about Flu Near You</h2>

  <div class="row">
    <form action="#" class="form faq col-xs-12">
      <label class="search-term" for="search-term">What's your question?</label>
      <input id="search-term" type="text" placeholder="Enter a search term" class="input-primary medium">
      <span id="count-result" class="count-result">Search</span>
    </form>

    <section id="questions" class="questions">
      <ul>
        <li id="faq-{{$index}}" class="faq-item col-xs-12 col-sm-12 col-md-6 col-lg-6"
        ng-class="{active:accordion==1}" ng-repeat="faq in faqFeeds | orderBy:'-ordering'">
          <h4 class="questions-title js-plus" ng-click="accordion = 1">{{ faq.ask }}</h4>
          <p class="questions-description" ng-show="accordion==1"> {{ faq.answer }} </p>
        </li>
      </ul>
    </section>
  </div>
</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
