<?php include 'php/includes/head.inc.php'; ?>
<?php include 'php/includes/navbar.inc.php' ?>

<section class="wrapper-section">
  <aside id="manage-account" class="manage-account">
    <h3 class="title-primary">Manage Your Account</h3>
    <button>Edit</button>

    <form action="" name="update-user-form" id="update-user-form" novalidate="novalidate">
      <div class="alert" role="alert" id="update-error">
        <span id="update-error-message" class="update-error-message"></span>
      </div>

      <table>
        <tbody>
          <tr>
            <td>Email address</td>
            <td>email@guinetik.com</td>

            <!-- show when click edit -->
            <td>
              <input class="input-primary large" type="email" value="email@guinetik.com" name="email">
            </td>
          </tr>

          <tr>
            <td>Nickname</td>
            <td>guinetik</td>

            <!-- show when click edit -->
            <td>
              <input type="text" class="input-primary large" value="guinetik" name="nickname">
            </td>
          </tr>

          <tr>
            <td>Birthdate</td>
            <td>9/1988</td>

            <!-- show when click edit -->
            <td>
              <div>
                <div>
                  <select name="birthmonth" id="month" class="select-primary" aria-required="true" required>
                    <option value="0" disabled>month</option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                </div>

                <div>
                  <input type="tel" class="input-primary large" name="birthyear" id="birthyear" value="1988" aria-required="true" required>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>Male</td>

            <!-- show when click edit -->
            <td>
              <div>
                <div>
                  <input type="radio" id="check-genre-m" value="M" name="gender">
                  <label for="check-genre-m" aria-required="true">Male</label>
                </div>

                <div>
                  <input type="radio" id="check-genre-f" value="F" name="gender">
                  <label for="check-genre-f" aria-required="true">Female</label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td>Zip code</td>
            <td>27892</td>

            <!-- show when click edit -->
            <td>
              <input type="tel" class="input-primary large" name="zip" value="27892">
            </td>
          </tr>

          <a href="#change-password" title="Change Password" class="btn-primary large">Change Password</a>
        </tbody>
      </table>

      <input type="submit" id="update-submit" class="input-primary large submit" value="Save">
    </form>
  </aside>

  <aside id="manage-subscribe" class="manage-subscribe">
    <h3 class="title-primary">Manage Subscribe</h3>

    <form action="" class="update-user-form" name="update-user-form" id="update-user-form">
      <table>
        <tbody>
          <tr>
            <td>E-mail receive</td>
            <td><a href="#" class="unsubscribe" title="unsubscribe">unsubscribe</a></td>

            <!-- show when click edit -->
            <td>
              <input type="email" class="input-primary large" value="email@guinetik.com" name="email">
            </td>
          </tr>
        </tbody>
      </table>

      <input type="submit" id="update-submit" class="input-primary large submit" value="Save">
    </form>
  </aside>

  <aside id="household-members" class="household-members">
    <h3 class="title-primary">Household Members</h3>
  </aside>

</section>

<?php include 'php/includes/footer.inc.php'; ?>
