<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	 public function __construct()
 	{
 		parent::__construct();
 		$this->load->helper(array('form','url','date'));
 		$this->load->library(array('session', 'form_validation', 'image_lib'));
 		$this->load->model('Login_model');
 	}

	public function index()
	{
		$this->load->view('login.php');
	}

	public function panel()
	{

		$this->form_validation->set_rules('login', 'Login', 'required', array('required' => '<div class="alert alert-danger" role="alert">Musisz podać %s.</div>'));
    $this->form_validation->set_rules('password', 'Hasło', 'required', array('required' => '<div class="alert alert-danger" role="alert">Musisz podać %s.</div>'));

		if ($this->form_validation->run() == FALSE)
		{
			//Brak autoryzacji
			$data = array(
					'username' => $this->input->post('login'),
					'is_logged_in' => false
				);
		}
		else
		{
			//Sprawdza dane logowania w modelu
			$query = $this->Login_model->validate();

			if($query)
			{
				//Autoryzacja po logowaniu przyznana za pomocą sesji
				$data = array(
					'username' => $this->input->post('login'),
					'is_logged_in' => true
				);
				$this->session->set_userdata($data);

				$message = array(
					'ok_status' => 'Dane zostały przesłane'
				);



			}
			else
			{
				//Brak autoryzacji
				$data = array(
					'username' => $this->input->post('login'),
					'is_logged_in' => false
				);

			}

		}

		$is_logged_in = $this->session->userdata('is_logged_in');
		//$is_logged_in = true;

		if(!isset($is_logged_in) || $is_logged_in != true)
		{
			//Brak autoryzacji
			$this->load->view('login.php');

		}
			else{
			//Autoryzacja przyznana za pomocą sesji
			$this->load->view('panel.html');
			}



	}

	public function logout()
	{

		$this->session->sess_destroy();
		$this->load->view('login.php');


	}

	public function posts()
	{
		$query = $this->Login_model->posts();
	}

	public function add_posts()
	{
		$is_logged_in = $this->session->userdata('is_logged_in');
		if (!isset($is_logged_in) || $is_logged_in != true)
		{
			$this->load->view('login.php');

		} else {

				$this->Login_model->add_posts();

		}
	}

	public function gallery()
	{
		$query = $this->Login_model->gallery();
	}

	public function add_gallery()
	{
		$is_logged_in = $this->session->userdata('is_logged_in');
		if (!isset($is_logged_in) || $is_logged_in != true)
		{
			$this->load->view('login.php');

		} else {

				$this->Login_model->add_gallery();

		}
	}

}
