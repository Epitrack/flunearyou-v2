<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="container">
  <div class="row">
    <ng-view></ng-view>
  </div>
</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
