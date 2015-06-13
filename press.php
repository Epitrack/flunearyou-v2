<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="wrapper-section">
  <ng-view></ng-view>
</section>

<div ng-include src="'includes/join-us.html'"></div>
<?php include 'php/includes/footer.inc.php'; ?>
