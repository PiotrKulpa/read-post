<?php
class Login_model extends CI_Model {

        public function __construct()
        {
            $this->load->database();
        }

		//Walidacja logowania na zaplecze
		public function validate()
		{


			$login = $this->input->post('login');
			$password = $this->input->post('password');
			$myquery = $this->db->query("SELECT * FROM users WHERE login = '$login'");
			$row = $myquery->row();
			if (isset($row))
			{
				$hash = $row->password;

				if (password_verify($password, $hash)) {
					//echo 'Password is valid!';
					return true;

				} else {
					//echo 'Invalid password.';
          echo '<div class="alert alert-danger" role="alert">Niepoprawne haslo</div>';
          return false;

				}


			} else{

				echo '<div class="alert alert-danger" role="alert">Nie ma takiego użytkownika</div>';
			}


		}

    public function posts()
  	{
  		$query = $this->db->get('posts');
  		$row = $query->result();

    		$this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($row, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
            ->_display();
    				exit;
  	}

    public function add_posts()
    {
      $title = $this->input->post('title');
      $inputtxt = $this->input->post('inputtxt');
      $now = time();
       // Euro czas
      $date = unix_to_human($now, TRUE, 'eu');
      $data = array(
        'title' => $title,
        'text' => $inputtxt,
        'date' => $date
      );
      $this->db->insert('posts', $data);

    }

    public function gallery()
    {
      $query = $this->db->query("SELECT * FROM gallery");
      $row = $query->result();

        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($row, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
            ->_display();
            exit;

    }

    public function add_gallery()
		{
//dodaj insert do bazy
//rozwiaz problem sciezek- przenies wszystkie stale zasoby do api/assets
//w js ustawisz sciezke przez window.location.hostname + 'api/assets'
//w ci ustawisz sciezki przez base_url() + '/assets'

      if (is_array($_FILES))
        {
          $fL = (count($_FILES));
          for ($x = 0; $x < $fL; $x++){
           if (is_uploaded_file($_FILES['userImage'.$x]['tmp_name'])) {
            $sourcePath = $_FILES['userImage'.$x]['tmp_name'];
            $targetPath = "./uploads/".$_FILES['userImage'.$x]['name'];
            $targetName = $_FILES['userImage'.$x]['name'];
            if(move_uploaded_file($sourcePath,$targetPath)) {
            ?>
             <div class="success">Plik: <?php echo $targetName; ?> został przesłany</div>
             <?php
            } else {
          	  ?>
          	 <div class="error">Wystąpił błąd podczas przesyłania: <?php echo $targetName; ?></div>
          	 <?php
            }
           }
          }
        }


		}

		public function add_music()
		{
			//Ustawiamy tytuł
			//$rawtitle = $this->upload->data('raw_name');
			//$title = str_replace("_"," ",$rawtitle);
			$title = $this->upload->data('raw_name');

			//Ustawiamy sciezke do pliku
			$rawsrc = $this->upload->data('file_name');
			$baseurl = base_url()."uploads/music/";
			$src = $baseurl.$rawsrc;

			//Ustawiamy czas
			$now = time();
			 // Euro czas
			$date = unix_to_human($now, TRUE, 'eu');

			//Query Builder Class automatycznie wykonuje Escaping Queries
			$data = array(
			'mtitle' => $title,
			'msrc' => $src,
			'mdate' => $date
			);

			$musicquery = $this->db->insert('music', $data);

			if ($musicquery) {


					return true;

				} else {


					return false;
				}

		}




		public function add_video()
		{
			//Ustawiamy czas
			$now = time();
			 // Euro czas
			$date = unix_to_human($now, TRUE, 'eu');
			//Ustawiamy dane z pol input
			$videotitle = $this->input->post('videotitle');
			$videocode = $this->input->post('videocode');
			$src = "https://www.youtube.com/embed/".$videocode;

			//Walidujemy dane z pol input
			$this->form_validation->set_rules('videotitle', 'Tytuł wideo', 'trim|required', array('required' => 'Musisz podać tytuł wideo.'));
			$this->form_validation->set_rules('videocode', 'Kod wideo', 'trim|required', array('required' => 'Musisz podać kod wideo.'));


			if ($this->form_validation->run() == FALSE)
                {
                        return false;
                }
                else
                {

						$data = array(
						'mtitle' => $videotitle,
						'msrc' => $src,
						'mdate' => $date
						);

						$videoquery = $this->db->insert('video', $data);

			if ($videoquery) {


					return true;

				} else {


					return false;
				}
                }
		}

}
