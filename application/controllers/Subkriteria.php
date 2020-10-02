<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Subkriteria extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Subkriteria_model');
        $this->load->model('Bobotkriterium_model');
        $this->load->library('ahp');
    }

    public function index()
    {
        $data['data'] = ['title' => 'Sub Kriteria', 'header' => 'Sub Kriteria'];
        $data['_view'] = 'kriterium/subkriteria';
        $this->load->view('layouts/main', $data);
    }

    public function getdata()
    {
        $result = $this->Subkriteria_model->select();
        echo json_encode($result);
    }

    public function add()
    {
        $params = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Subkriteria_model->insert($params);
        echo json_encode($result);
    }
    public function checkcr()
    {
        $value = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $alternatif = $value['alternatif'];
        $kriteria = $value['kriteria'];
        $params = $this->Bobotkriterium_model->get_all_bobotkriteria();
        // $data = $this->Kriterium_model->get_all_kriteria();
        $criterias = [];
        $ar = [];
        $candidates = [];
        for ($i = 0; $i < count($kriteria); $i++) {
            array_push($criterias, $kriteria[$i]['kriteria']);
        }
        $b = 0;
        for ($i = 0; $i < count($kriteria); $i++) {
            $item = [];

            for ($j = 0; $j < count($kriteria); $j++) {
                if ($i == $j) {
                    array_push($item, 1);
                } else if ($i < $j) {
                    array_push($item, $params[$b]['bobot']);
                    $b += 1;
                } else {
                    array_push($item, null);
                }
            }
            array_push($ar, $item);
        }

        foreach ($criterias as $key => $value) {
            $this->ahp->addQualitativeCriteria($value);
        }
        $ahpCR = $this->ahp->setRelativeInterestMatrix($ar);
        if ($ahpCR->CR < 0.10) {
            // for ($i = 0; $i < count($alternatif); $i++) {
            //     array_push($candidates, $alternatif[$i]['nama']);
            // }
            // $this->ahp->setCandidates($candidates);
            $pairWise = $this->ahp->setSubkriteria($kriteria);
            $ahp = $this->ahp->setBatchCriteriaPairWise($pairWise);
            // $ahp = $this->ahp->finalize();
            // $ahp = $this->ahp->getResult();
            // $ahp->deb=$this->ahp->debug();
            echo json_encode((array) $ahp);

        } else {
            http_response_code(400);
            echo json_encode(['message' => "Nilai Bobot tidak konsisten Perbaiki Pembobotan Kriteria pada Menu Kriteria"]);
        }
    }
    public function simpanbobot()
    {
        $params = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Subkriteria_model->add_bobot($params);
        echo json_encode(['message' => $result]);
    }
}

/* End of file Controllername.php */
