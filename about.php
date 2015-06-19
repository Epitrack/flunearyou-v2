<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="section" ng-controller="AboutCtrl">
  <h2 class="title-section">About Flu Near You</h2>

  <div class="row">
    <div ng-include src="'includes/about-tabs.html'"></div>
  </div>
</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
