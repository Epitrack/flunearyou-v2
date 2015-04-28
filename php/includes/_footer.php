  <footer class="footer-primary">
    <nav class="nav-secondary">
      <ul>
        <li>Flu Near You 2015</li>
        <li><a href="terms" title="Terms & Conditions">Terms & Conditions</a></li>
        <li><a href="privacy" title="Privacy Policy">Privacy Policy</a></li>
      </ul>

      <ul>
        <li><a href="mailto:flunearyou@healthmap.org?subject=contact" title="Send a email">flunearyou@healthmap.org</a></li>
        <li><a href="https://www.facebook.com/flunearyou.org" target="_blank" title="Facebook">Facebook</a></li>
        <li><a href="https://twitter.com/FluNearYou" target="_blank" title="Twitter">Twitter</a></li>
        <li><a href="https://plus.google.com/107384974541354678805/" target="_blank" title="Google Plus">Google Plus</a></li>
      </ul>
    </nav>
  </footer>

  <!-- SCRIPTS -->
  <?php $Catrina->writeScripts(); ?>
  <script>APP.init()</script>

  <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
  <script>
    // Tracking events
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();


    // Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXX-X', 'auto');
    ga('send', 'pageview');
  </script>
</body>
</html>
