<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Form extends CI_Controller {



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
	public function index()
	{
			$email = $this->input->post('email');
			$textarea = $this->input->post('textarea');

			if ($email && $textarea) {

				$this->load->library('email');

				$this->email->from($email, $email);
				$this->email->to('p.kulpa@onet.eu');
				//$this->email->cc('another@another-example.com');
				//$this->email->bcc('them@their-example.com');

				$this->email->subject('Email Test');
				$this->email->message($textarea);



				if ($this->email->send()) {
					header('Content-Type: application/json');
	    		echo json_encode(array('status' => 'mail zostal wyslany'));
	        die();
				} else {
					header('Content-Type: application/json');
	    		echo json_encode(array('status' => 'problem z wyslaniem emaila'));
	        die();
				}
			} else {
				header('Content-Type: application/json');
    		echo json_encode(array('status' => 'problem z przeslaniem danych'));
        die();
			}
	}
}
