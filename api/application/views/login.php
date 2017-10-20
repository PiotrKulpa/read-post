
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" href="http://localhost/formtest/css/bootstrap.min.css">

</head>
<body>



	<div class="container jumbotron" style="top:50%; left:50%; position: fixed; transform: translate(-50%, -50%);">

		<?php echo form_open('login/panel'); ?>

	    <div class="form-group row">

	      <label for="inputEmail3" class="col-sm-2 col-form-label">Login</label>
	      <div class="col-sm-10">
	        <input type="text" name="login" class="form-control" id="inputEmail3" placeholder="Wpisz login">
					<?php echo form_error('login', '<div class="error">', '</div>'); ?>
	      </div>
	    </div>
	    <div class="form-group row">
	      <label for="inputPassword3" class="col-sm-2 col-form-label">Haslo</label>
	      <div class="col-sm-10">
	        <input type="password" name="password" class="form-control" id="inputPassword3" placeholder="Wpisz haslo">
					<?php echo form_error('password', '<div class="error">', '</div>'); ?>
	      </div>
	    </div>


	    <div class="form-group row">
	      <div class="col-sm-10">
	        <button type="submit" class="btn btn-primary">Zaloguj</button>
	      </div>
	    </div>
			

	  </form>
	</div>

<script src="http://localhost/formtest/css/bootstrap.min.css"></script>

<script src="http://localhost/formtest/css/bootstrap.min.css"></script>

<script src="http://localhost/formtest/css/bootstrap.min.css"></script>

</body>
</html>
